import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import funcUrls from "../../backend/func2url.json";

const Index = () => {
  const [copiedIP, setCopiedIP] = useState(false);
  const serverIP = "mc.proxycraft.ru";
  const [serverStatus, setServerStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const mockPlayers = [
    { name: "Steve_Pro", avatar: "S", status: "online", ping: 45 },
    { name: "Alex_Miner", avatar: "A", status: "online", ping: 67 },
    { name: "Herobrine", avatar: "H", status: "online", ping: 12 },
    { name: "Notch_Real", avatar: "N", status: "online", ping: 89 },
    { name: "CreeperKing", avatar: "C", status: "online", ping: 34 },
  ];

  const mockTopPlayers = [
    { rank: 1, name: "Steve_Pro", playtime: "342ч 15м", level: 89 },
    { rank: 2, name: "Alex_Miner", playtime: "298ч 45м", level: 76 },
    { rank: 3, name: "Herobrine", playtime: "267ч 30м", level: 72 },
    { rank: 4, name: "Notch_Real", playtime: "245ч 12м", level: 68 },
    { rank: 5, name: "CreeperKing", playtime: "223ч 08м", level: 64 },
  ];

  const [chatMessages, setChatMessages] = useState([
    { user: "Steve_Pro", message: "Привет всем!", time: "12:34" },
    { user: "Alex_Miner", message: "Кто на выживание?", time: "12:35" },
    { user: "Herobrine", message: "Я создал портал в Энд!", time: "12:36" },
  ]);

  const rules = [
    "Запрещено использование читов и модов",
    "Уважайте других игроков",
    "Запрещен griefing чужих построек",
    "Не спамьте в чат",
    "Запрещена реклама других серверов",
    "Слушайте администрацию сервера",
  ];

  const copyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopiedIP(true);
    setTimeout(() => setCopiedIP(false), 2000);
  };

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${funcUrls['minecraft-status']}?ip=${serverIP}`);
        const data = await response.json();
        setServerStatus(data);
      } catch (error) {
        console.error('Error fetching server status:', error);
        setServerStatus({ online: false, players: { online: 0, max: 0 } });
      } finally {
        setLoading(false);
      }
    };

    fetchServerStatus();
    const statusInterval = setInterval(fetchServerStatus, 30000);

    const chatInterval = setInterval(() => {
      const messages = [
        "Новая арена открыта!",
        "Кто хочет сразиться?",
        "Нашел алмазы на -2500!",
        "Кто-то видел дракона?",
        "Крутой замок построил!",
      ];
      const users = ["Player1", "Player2", "Player3", "Player4"];
      const newMsg = {
        user: users[Math.floor(Math.random() * users.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev.slice(-9), newMsg]);
    }, 5000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(chatInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--darker-bg))] text-foreground overflow-x-hidden">
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--neon-green)) 2px,
            hsl(var(--neon-green)) 4px
          )`,
        }}
      />

      <nav className="relative border-b-4 border-[hsl(var(--neon-green))] bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[hsl(var(--neon-green))] flex items-center justify-center text-2xl font-bold text-black">
              P
            </div>
            <h1 className="text-2xl font-bold glow-text text-[hsl(var(--neon-green))]">
              ProxyCraft
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {loading ? (
              <Badge className="bg-muted text-foreground border-0 text-sm px-3 py-1">
                <Icon name="Loader2" size={14} className="mr-1 animate-spin" />
                Загрузка...
              </Badge>
            ) : (
              <Badge className={`${serverStatus?.online ? 'bg-[hsl(var(--neon-green))]' : 'bg-red-500'} text-black border-0 text-sm px-3 py-1`}>
                <Icon name="Wifi" size={14} className="mr-1" />
                {serverStatus?.players?.online || 0} онлайн
              </Badge>
            )}
          </div>
        </div>
      </nav>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-cyan))]/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 glow-text text-[hsl(var(--neon-cyan))]">
            PROXYCRAFT
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-[hsl(var(--neon-green))]">
            Лучший Minecraft сервер для выживания
          </p>
          
          <Card className="inline-block bg-card/80 backdrop-blur border-2 border-[hsl(var(--neon-green))] pulse-border p-6 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-mono text-[hsl(var(--neon-green))]">{serverIP}</span>
              <Button
                onClick={copyIP}
                className="minecraft-btn bg-[hsl(var(--neon-green))] hover:bg-[hsl(var(--neon-cyan))] text-black font-bold"
              >
                {copiedIP ? (
                  <>
                    <Icon name="Check" size={16} className="mr-2" />
                    Скопировано!
                  </>
                ) : (
                  <>
                    <Icon name="Copy" size={16} className="mr-2" />
                    Копировать IP
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <Tabs defaultValue="status" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card border-2 border-[hsl(var(--neon-green))] p-1">
            <TabsTrigger
              value="status"
              className="data-[state=active]:bg-[hsl(var(--neon-green))] data-[state=active]:text-black font-bold"
            >
              <Icon name="Activity" size={16} className="mr-2" />
              Статус
            </TabsTrigger>
            <TabsTrigger
              value="players"
              className="data-[state=active]:bg-[hsl(var(--neon-green))] data-[state=active]:text-black font-bold"
            >
              <Icon name="Users" size={16} className="mr-2" />
              Игроки
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-[hsl(var(--neon-green))] data-[state=active]:text-black font-bold"
            >
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Чат
            </TabsTrigger>
            <TabsTrigger
              value="top"
              className="data-[state=active]:bg-[hsl(var(--neon-green))] data-[state=active]:text-black font-bold"
            >
              <Icon name="Trophy" size={16} className="mr-2" />
              Топ
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="data-[state=active]:bg-[hsl(var(--neon-green))] data-[state=active]:text-black font-bold"
            >
              <Icon name="BookOpen" size={16} className="mr-2" />
              Правила
            </TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-card/80 backdrop-blur border-2 border-[hsl(var(--neon-green))] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Статус сервера</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${serverStatus?.online ? 'bg-[hsl(var(--neon-green))]' : 'bg-red-500'} animate-pulse`} />
                      <span className={`text-2xl font-bold ${serverStatus?.online ? 'text-[hsl(var(--neon-green))]' : 'text-red-500'}`}>
                        {loading ? 'Загрузка...' : serverStatus?.online ? 'Онлайн' : 'Офлайн'}
                      </span>
                    </div>
                  </div>
                  <Icon name="CheckCircle" size={40} className="text-[hsl(var(--neon-green))]" />
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-2 border-[hsl(var(--neon-cyan))] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Игроков онлайн</p>
                    <span className="text-2xl font-bold text-[hsl(var(--neon-cyan))]">
                      {loading ? '...' : `${serverStatus?.players?.online || 0} / ${serverStatus?.players?.max || 100}`}
                    </span>
                  </div>
                  <Icon name="Users" size={40} className="text-[hsl(var(--neon-cyan))]" />
                </div>
              </Card>

              <Card className="bg-card/80 backdrop-blur border-2 border-[hsl(var(--neon-purple))] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Версия</p>
                    <span className="text-2xl font-bold text-[hsl(var(--neon-purple))]">
                      {loading ? '...' : serverStatus?.version?.name || '1.20.4'}
                    </span>
                  </div>
                  <Icon name="Box" size={40} className="text-[hsl(var(--neon-purple))]" />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players">
            <Card className="bg-card/80 backdrop-blur border-2 border-[hsl(var(--neon-cyan))] p-6">
              <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--neon-cyan))]">
                Игроки на сервере
              </h3>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {mockPlayers.map((player, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-muted/50 border border-[hsl(var(--neon-cyan))]/30 rounded hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="border-2 border-[hsl(var(--neon-cyan))]">
                          <AvatarFallback className="bg-[hsl(var(--neon-cyan))] text-black font-bold">
                            {player.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-[hsl(var(--neon-cyan))]">{player.name}</p>
                          <p className="text-sm text-muted-foreground">Пинг: {player.ping}ms</p>
                        </div>
                      </div>
                      <Badge className="bg-[hsl(var(--neon-green))] text-black border-0">
                        Online
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card className="bg-card/80 backdrop-blur border-2 border-[hsl(var(--neon-purple))] p-6">
              <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--neon-purple))]">
                Чат в реальном времени
              </h3>
              <ScrollArea className="h-[400px] border border-[hsl(var(--neon-purple))]/30 rounded p-4 bg-black/30">
                <div className="space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="animate-fade-in">
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-muted-foreground">[{msg.time}]</span>
                        <span className="font-bold text-[hsl(var(--neon-purple))]">
                          {msg.user}:
                        </span>
                        <span className="text-foreground">{msg.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="top">
            <Card className="bg-card/80 backdrop-blur border-2 border-[hsl(var(--neon-green))] p-6">
              <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--neon-green))]">
                Топ игроков по активности
              </h3>
              <div className="space-y-3">
                {mockTopPlayers.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between p-4 bg-muted/50 border border-[hsl(var(--neon-green))]/30 rounded hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center font-bold text-xl border-2 ${
                          player.rank === 1
                            ? "bg-yellow-400 border-yellow-500 text-black"
                            : player.rank === 2
                            ? "bg-gray-300 border-gray-400 text-black"
                            : player.rank === 3
                            ? "bg-orange-400 border-orange-500 text-black"
                            : "bg-muted border-[hsl(var(--neon-green))] text-[hsl(var(--neon-green))]"
                        }`}
                      >
                        {player.rank}
                      </div>
                      <div>
                        <p className="font-bold text-[hsl(var(--neon-green))]">{player.name}</p>
                        <p className="text-sm text-muted-foreground">Уровень: {player.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Icon name="Clock" size={16} className="inline mr-1 text-[hsl(var(--neon-cyan))]" />
                      <span className="font-mono text-[hsl(var(--neon-cyan))]">
                        {player.playtime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <Card className="bg-card/80 backdrop-blur border-2 border-[hsl(var(--neon-purple))] p-6">
              <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--neon-purple))]">
                Правила сервера
              </h3>
              <div className="space-y-3">
                {rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-muted/50 border border-[hsl(var(--neon-purple))]/30 rounded"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-[hsl(var(--neon-purple))] text-black font-bold rounded">
                      {idx + 1}
                    </div>
                    <p className="flex-1 text-foreground">{rule}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="border-t-4 border-[hsl(var(--neon-green))] bg-card/50 backdrop-blur py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[hsl(var(--neon-green))]">
            © 2024 ProxyCraft. Лучший сервер Minecraft
          </p>
          <p className="text-sm text-muted-foreground mt-2">mc.proxycraft.ru</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;