import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { playLikeSound, playClickSound } from '@/utils/sounds';

interface Comment {
  id: number;
  user_name: string;
  comment_text: string;
  emoji_reaction: string;
  created_at: string;
}

const API_URL = 'https://functions.poehali.dev/5764d595-0935-463b-929e-b6051324189a';

const TrailerSection = () => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('😊');

  const emojis = [
    { emoji: '😢', label: 'Грусть' },
    { emoji: '😠', label: 'Злость' },
    { emoji: '😌', label: 'Спокойствие' },
    { emoji: '😊', label: 'Радость' }
  ];

  const getUserSession = () => {
    let session = localStorage.getItem('userSession');
    if (!session) {
      session = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userSession', session);
    }
    return session;
  };

  const loadData = async () => {
    try {
      const response = await fetch(`${API_URL}?action=stats`);
      const data = await response.json();
      setLikes(data.likes);
      setComments(data.comments);
      
      const session = getUserSession();
      const userHasLiked = localStorage.getItem(`liked_${session}`);
      setHasLiked(!!userHasLiked);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = async () => {
    if (hasLiked) return;
    
    playLikeSound();
    const session = getUserSession();
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'like',
          userSession: session
        })
      });
      
      const data = await response.json();
      setLikes(data.likes);
      setHasLiked(true);
      localStorage.setItem(`liked_${session}`, 'true');
    } catch (error) {
      console.error('Error liking:', error);
    }
  };

  const handleComment = async () => {
    if (!userName.trim() || !commentText.trim()) return;
    
    playClickSound();
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'comment',
          userName: userName.trim(),
          commentText: commentText.trim(),
          emojiReaction: selectedEmoji
        })
      });
      
      const data = await response.json();
      setComments([data.comment, ...comments]);
      setUserName('');
      setCommentText('');
      setSelectedEmoji('😊');
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  return (
    <Card className="border-2 gradient-border bg-card/80 backdrop-blur-sm animate-slide-in">
      <CardHeader>
        <CardTitle className="text-3xl gradient-text">Официальный трейлер</CardTitle>
        <CardDescription className="text-foreground/70">
          Погрузитесь в захватывающий мир нашего проекта
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/5g8bn7_hMhI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        
        <div className="p-6 rounded-lg bg-card border-2 gradient-border">
          <h3 className="text-2xl font-bold gradient-text mb-3">Сюжет</h3>
          <p className="text-foreground/90 leading-relaxed">
            Вы попали в игру и не знаете как из неё выбраться. Вам надо пройти все 20 уровней и нажать кнопку "Завершить работу". И вас перекинет обратно в реальность.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 p-4 rounded-lg bg-card border gradient-border">
          <Button
            onClick={handleLike}
            disabled={hasLiked}
            className={`flex items-center gap-2 ${hasLiked ? 'opacity-50 cursor-not-allowed' : 'gradient-bg hover:opacity-90'}`}
          >
            <Icon name={hasLiked ? "Heart" : "Heart"} size={20} className={hasLiked ? "fill-red-500 text-red-500" : ""} />
            <span className="font-bold">{likes}</span>
            <span>{hasLiked ? 'Лайк поставлен' : 'Поставить лайк'}</span>
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold gradient-text">Комментарии</h3>
          
          <Card className="border gradient-border bg-card/50">
            <CardContent className="p-4 space-y-4">
              <Input
                placeholder="Ваше имя"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-background/50 text-foreground border-border"
              />
              
              <Textarea
                placeholder="Ваш комментарий..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="bg-background/50 text-foreground border-border min-h-[80px]"
              />
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/70">Настроение:</span>
                {emojis.map((item) => (
                  <Button
                    key={item.emoji}
                    variant={selectedEmoji === item.emoji ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      playClickSound();
                      setSelectedEmoji(item.emoji);
                    }}
                    className="text-2xl"
                    title={item.label}
                  >
                    {item.emoji}
                  </Button>
                ))}
              </div>
              
              <Button 
                onClick={handleComment}
                disabled={!userName.trim() || !commentText.trim()}
                className="w-full gradient-bg hover:opacity-90"
              >
                <Icon name="Send" size={18} className="mr-2" />
                Отправить
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {comments.map((comment) => (
              <Card key={comment.id} className="border gradient-border bg-card/80 animate-fade-in hover:scale-[1.01] transition-transform">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{comment.emoji_reaction}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">{comment.user_name}</span>
                        <span className="text-xs text-foreground/50">{new Date(comment.created_at).toLocaleString('ru-RU')}</span>
                      </div>
                      <p className="text-foreground/90">{comment.comment_text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrailerSection;
