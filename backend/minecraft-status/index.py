import json
from typing import Dict, Any
from mcstatus import JavaServer

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get Minecraft server status and player list
    Args: event - dict with httpMethod, queryStringParameters
          context - object with request_id, function_name attributes
    Returns: HTTP response dict with server status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    server_address: str = params.get('ip', 'mc.proxycraft.ru')
    
    try:
        server = JavaServer.lookup(server_address)
        status = server.status()
        
        players_list = []
        if hasattr(status, 'players') and hasattr(status.players, 'sample') and status.players.sample:
            players_list = [{'name': p.name, 'id': p.id} for p in status.players.sample]
        
        description_text = ""
        if hasattr(status, 'description'):
            description_text = status.description
        
        result = {
            'online': True,
            'players': {
                'online': status.players.online if hasattr(status, 'players') else 0,
                'max': status.players.max if hasattr(status, 'players') else 0,
                'sample': players_list
            },
            'version': {
                'name': status.version.name if hasattr(status, 'version') else 'Unknown',
                'protocol': status.version.protocol if hasattr(status, 'version') else 0
            },
            'description': description_text,
            'latency': round(status.latency, 2) if hasattr(status, 'latency') else 0
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'online': False,
                'error': str(e),
                'players': {'online': 0, 'max': 0, 'sample': []},
                'version': {'name': 'Unknown', 'protocol': 0},
                'description': 'Server offline',
                'latency': 0
            }),
            'isBase64Encoded': False
        }
