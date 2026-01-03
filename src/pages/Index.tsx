import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

type Theme = 'light' | 'dark' | 'custom';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface CustomColors {
  background: string;
  card: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  gradientStart: string;
  gradientMid: string;
  gradientEnd: string;
}

const Index = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Александр М.',
      rating: 5,
      comment: 'Невероятный трейлер! Визуальные эффекты просто поражают воображение. Не могу дождаться выхода!',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Мария К.',
      rating: 5,
      comment: 'Атмосфера передана идеально. Музыка, операторская работа - всё на высшем уровне!',
      date: '2024-01-14'
    },
    {
      id: 3,
      name: 'Дмитрий П.',
      rating: 4,
      comment: 'Очень интересная концепция! Хотелось бы увидеть больше деталей о сюжете.',
      date: '2024-01-13'
    }
  ]);

  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [customColors, setCustomColors] = useState<CustomColors>({
    background: '240 10% 5%',
    card: '240 10% 8%',
    primary: '270 80% 65%',
    secondary: '280 70% 55%',
    accent: '25 95% 55%',
    border: '240 10% 20%',
    gradientStart: '270 80% 65%',
    gradientMid: '320 80% 60%',
    gradientEnd: '25 95% 55%'
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'custom');
    root.classList.add(theme);

    if (theme === 'custom') {
      root.style.setProperty('--custom-background', customColors.background);
      root.style.setProperty('--custom-card', customColors.card);
      root.style.setProperty('--custom-primary', customColors.primary);
      root.style.setProperty('--custom-secondary', customColors.secondary);
      root.style.setProperty('--custom-accent', customColors.accent);
      root.style.setProperty('--custom-border', customColors.border);
      root.style.setProperty('--custom-gradient-start', customColors.gradientStart);
      root.style.setProperty('--custom-gradient-mid', customColors.gradientMid);
      root.style.setProperty('--custom-gradient-end', customColors.gradientEnd);
    }
  }, [theme, customColors]);

  const handleSubmitReview = () => {
    if (newReview.name && newReview.comment) {
      const review: Review = {
        id: reviews.length + 1,
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: '', rating: 5, comment: '' });
    }
  };

  const faqData = [
    {
      question: 'Когда выйдет полная версия?',
      answer: 'Релиз игры запланирован на 5 февраля 2026 года.'
    },
    {
      question: 'На каких платформах будет доступен проект?',
      answer: 'Проект будет доступен на всех основных платформах: ПК, консоли нового поколения и мобильные устройства.'
    },
    {
      question: 'Будет ли поддержка русского языка?',
      answer: 'Да! Полная локализация на русский язык, включая озвучку и субтитры.'
    },
    {
      question: 'Какие системные требования?',
      answer: 'Минимальные требования: Intel Core i5, 8GB RAM, GTX 1060. Рекомендуемые: Intel Core i7, 16GB RAM, RTX 3060.'
    },
    {
      question: 'Есть ли мультиплеер?',
      answer: 'Нет. Данная игра не поддерживает мультиплеер.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background animate-gradient-shift bg-300%">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-between gap-4 mb-12 sm:flex-row animate-fade-in">
          <h1 className="text-5xl font-bold text-glow animate-glow-pulse gradient-text">
            Мотоцикл: Проект Препятствие
          </h1>
          
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 p-1 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
              <Button
                variant={theme === 'light' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTheme('light')}
                className="transition-all duration-300"
              >
                <Icon name="Sun" size={18} />
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTheme('dark')}
                className="transition-all duration-300"
              >
                <Icon name="Moon" size={18} />
              </Button>
              <Button
                variant={theme === 'custom' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTheme('custom')}
                className="transition-all duration-300"
              >
                <Icon name="Palette" size={18} />
              </Button>
            </div>

            {theme === 'custom' && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gradient-border">
                    <Icon name="Settings" size={18} className="mr-2" />
                    Настроить
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="gradient-text">Кастомная тема</SheetTitle>
                    <SheetDescription className="text-foreground/80">
                      Настройте цвета под себя
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-foreground">Фон (Hue)</Label>
                      <Slider
                        value={[parseInt(customColors.background.split(' ')[0])]}
                        onValueChange={(v) => setCustomColors({...customColors, background: `${v[0]} 10% 5%`})}
                        max={360}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-foreground">Основной цвет (Hue)</Label>
                      <Slider
                        value={[parseInt(customColors.primary.split(' ')[0])]}
                        onValueChange={(v) => setCustomColors({...customColors, primary: `${v[0]} 80% 65%`})}
                        max={360}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-foreground">Вторичный цвет (Hue)</Label>
                      <Slider
                        value={[parseInt(customColors.secondary.split(' ')[0])]}
                        onValueChange={(v) => setCustomColors({...customColors, secondary: `${v[0]} 70% 55%`})}
                        max={360}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-foreground">Акцентный цвет (Hue)</Label>
                      <Slider
                        value={[parseInt(customColors.accent.split(' ')[0])]}
                        onValueChange={(v) => setCustomColors({...customColors, accent: `${v[0]} 95% 55%`})}
                        max={360}
                        step={1}
                        className="mt-2"
                      />
                    </div>

                    <div className="pt-4 border-t border-border">
                      <h3 className="text-sm font-semibold mb-3 text-foreground">Градиент</h3>
                      
                      <div>
                        <Label className="text-foreground">Начало (Hue)</Label>
                        <Slider
                          value={[parseInt(customColors.gradientStart.split(' ')[0])]}
                          onValueChange={(v) => setCustomColors({...customColors, gradientStart: `${v[0]} 80% 65%`})}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      
                      <div className="mt-4">
                        <Label className="text-foreground">Середина (Hue)</Label>
                        <Slider
                          value={[parseInt(customColors.gradientMid.split(' ')[0])]}
                          onValueChange={(v) => setCustomColors({...customColors, gradientMid: `${v[0]} 80% 60%`})}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      
                      <div className="mt-4">
                        <Label className="text-foreground">Конец (Hue)</Label>
                        <Slider
                          value={[parseInt(customColors.gradientEnd.split(' ')[0])]}
                          onValueChange={(v) => setCustomColors({...customColors, gradientEnd: `${v[0]} 95% 55%`})}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="h-20 rounded-lg gradient-bg animate-gradient-shift bg-300%" />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </header>

        <Tabs defaultValue="trailer" className="w-full animate-fade-in">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-card/50 backdrop-blur-sm border border-border">
            <TabsTrigger value="trailer" className="text-foreground data-[state=active]:gradient-bg">
              <Icon name="Play" size={18} className="mr-2" />
              Трейлер
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-foreground data-[state=active]:gradient-bg">
              <Icon name="Star" size={18} className="mr-2" />
              Отзывы
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-foreground data-[state=active]:gradient-bg">
              <Icon name="HelpCircle" size={18} className="mr-2" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="links" className="text-foreground data-[state=active]:gradient-bg">
              <Icon name="Link" size={18} className="mr-2" />
              Ссылки
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="text-foreground data-[state=active]:gradient-bg">
              <Icon name="Heart" size={18} className="mr-2" />
              Спонсоры
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trailer" className="animate-fade-in">
            <Card className="border-2 gradient-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl gradient-text">Официальный трейлер</CardTitle>
                <CardDescription className="text-foreground/70">
                  Погрузитесь в захватывающий мир нашего проекта
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="animate-fade-in space-y-6">
            <Card className="border-2 gradient-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text">Оставить отзыв</CardTitle>
                <CardDescription className="text-foreground/70">
                  Поделитесь своими впечатлениями
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">Ваше имя</Label>
                  <Input
                    id="name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    placeholder="Введите ваше имя"
                    className="mt-1 bg-background/50 text-foreground border-border"
                  />
                </div>

                <div>
                  <Label htmlFor="rating" className="text-foreground">Оценка: {newReview.rating} / 5</Label>
                  <Slider
                    id="rating"
                    value={[newReview.rating]}
                    onValueChange={(v) => setNewReview({...newReview, rating: v[0]})}
                    max={5}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="comment" className="text-foreground">Отзыв</Label>
                  <Textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Расскажите, что вы думаете..."
                    className="mt-1 min-h-[100px] bg-background/50 text-foreground border-border"
                  />
                </div>

                <Button 
                  onClick={handleSubmitReview}
                  className="w-full gradient-bg hover:opacity-90 transition-opacity"
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить отзыв
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="border gradient-border bg-card/80 backdrop-blur-sm animate-fade-in hover:scale-[1.02] transition-transform">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-foreground">{review.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name={i < review.rating ? "Star" : "Star"}
                            size={16}
                            className={i < review.rating ? "fill-accent text-accent" : "text-muted"}
                          />
                        ))}
                      </div>
                    </div>
                    <CardDescription className="text-foreground/60">{review.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/90">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faq" className="animate-fade-in">
            <Card className="border-2 gradient-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl gradient-text">Часто задаваемые вопросы</CardTitle>
                <CardDescription className="text-foreground/70">
                  Ответы на популярные вопросы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-border">
                      <AccordionTrigger className="text-foreground hover:text-primary text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="links" className="animate-fade-in">
            <Card className="border-2 gradient-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl gradient-text">Полезные ссылки</CardTitle>
                <CardDescription className="text-foreground/70">
                  Другие проекты и ресурсы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <a 
                  href="https://motorcycle-test-website--preview.poehali.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg gradient-border bg-card/50 hover:bg-card/70 transition-all hover:scale-[1.02]"
                >
                  <Icon name="Bike" size={24} className="text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Тестовый сайт Мотоцикл</h3>
                    <p className="text-sm text-foreground/60">motorcycle-test-website--preview.poehali.dev</p>
                  </div>
                  <Icon name="ExternalLink" size={18} className="ml-auto text-muted" />
                </a>

                <a 
                  href="https://ticket-popcorn-project--preview.poehali.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg gradient-border bg-card/50 hover:bg-card/70 transition-all hover:scale-[1.02]"
                >
                  <Icon name="Popcorn" size={24} className="text-secondary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Проект Билеты и Попкорн</h3>
                    <p className="text-sm text-foreground/60">ticket-popcorn-project--preview.poehali.dev</p>
                  </div>
                  <Icon name="ExternalLink" size={18} className="ml-auto text-muted" />
                </a>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sponsors" className="animate-fade-in">
            <Card className="border-2 gradient-border bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl gradient-text">Наши спонсоры</CardTitle>
                <CardDescription className="text-foreground/70">
                  Благодарим за поддержку проекта
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://leaf-shop-creation--preview.poehali.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-lg gradient-bg hover:opacity-90 transition-opacity"
                >
                  <Icon name="Store" size={32} className="text-white" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Leaf Shop</h3>
                    <p className="text-white/80">Официальный спонсор проекта</p>
                    <p className="text-sm text-white/60 mt-1">leaf-shop-creation--preview.poehali.dev</p>
                  </div>
                  <Icon name="ExternalLink" size={20} className="ml-auto text-white/70" />
                </a>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;