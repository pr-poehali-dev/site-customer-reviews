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
  background: { h: number; s: number; l: number };
  card: { h: number; s: number; l: number };
  primary: { h: number; s: number; l: number };
  secondary: { h: number; s: number; l: number };
  accent: { h: number; s: number; l: number };
  border: { h: number; s: number; l: number };
  gradientStart: { h: number; s: number; l: number };
  gradientMid: { h: number; s: number; l: number };
  gradientEnd: { h: number; s: number; l: number };
}

const Index = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });
  
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
  const [customColors, setCustomColors] = useState<CustomColors>(() => {
    const saved = localStorage.getItem('customColors');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          background: { h: 240, s: 10, l: 5 },
          card: { h: 240, s: 10, l: 8 },
          primary: { h: 270, s: 80, l: 65 },
          secondary: { h: 280, s: 70, l: 55 },
          accent: { h: 25, s: 95, l: 55 },
          border: { h: 240, s: 10, l: 20 },
          gradientStart: { h: 270, s: 80, l: 65 },
          gradientMid: { h: 320, s: 80, l: 60 },
          gradientEnd: { h: 25, s: 95, l: 55 }
        };
      }
    }
    return {
      background: { h: 240, s: 10, l: 5 },
      card: { h: 240, s: 10, l: 8 },
      primary: { h: 270, s: 80, l: 65 },
      secondary: { h: 280, s: 70, l: 55 },
      accent: { h: 25, s: 95, l: 55 },
      border: { h: 240, s: 10, l: 20 },
      gradientStart: { h: 270, s: 80, l: 65 },
      gradientMid: { h: 320, s: 80, l: 60 },
      gradientEnd: { h: 25, s: 95, l: 55 }
    };
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'custom');
    root.classList.add(theme);

    if (theme === 'custom') {
      root.style.setProperty('--custom-background', `${customColors.background.h} ${customColors.background.s}% ${customColors.background.l}%`);
      root.style.setProperty('--custom-card', `${customColors.card.h} ${customColors.card.s}% ${customColors.card.l}%`);
      root.style.setProperty('--custom-primary', `${customColors.primary.h} ${customColors.primary.s}% ${customColors.primary.l}%`);
      root.style.setProperty('--custom-secondary', `${customColors.secondary.h} ${customColors.secondary.s}% ${customColors.secondary.l}%`);
      root.style.setProperty('--custom-accent', `${customColors.accent.h} ${customColors.accent.s}% ${customColors.accent.l}%`);
      root.style.setProperty('--custom-border', `${customColors.border.h} ${customColors.border.s}% ${customColors.border.l}%`);
      root.style.setProperty('--custom-gradient-start', `${customColors.gradientStart.h} ${customColors.gradientStart.s}% ${customColors.gradientStart.l}%`);
      root.style.setProperty('--custom-gradient-mid', `${customColors.gradientMid.h} ${customColors.gradientMid.s}% ${customColors.gradientMid.l}%`);
      root.style.setProperty('--custom-gradient-end', `${customColors.gradientEnd.h} ${customColors.gradientEnd.s}% ${customColors.gradientEnd.l}%`);
    }
  }, [theme, customColors]);

  useEffect(() => {
    localStorage.setItem('customColors', JSON.stringify(customColors));
  }, [customColors]);

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
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Фон</h3>
                      <div>
                        <Label className="text-foreground">Оттенок (H): {customColors.background.h}°</Label>
                        <Slider
                          value={[customColors.background.h]}
                          onValueChange={(v) => setCustomColors({...customColors, background: {...customColors.background, h: v[0]}})}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Насыщенность (S): {customColors.background.s}%</Label>
                        <Slider
                          value={[customColors.background.s]}
                          onValueChange={(v) => setCustomColors({...customColors, background: {...customColors.background, s: v[0]}})}
                          max={100}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Яркость (L): {customColors.background.l}%</Label>
                        <Slider
                          value={[customColors.background.l]}
                          onValueChange={(v) => setCustomColors({...customColors, background: {...customColors.background, l: v[0]}})}
                          max={100}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div className="h-12 rounded-lg" style={{backgroundColor: `hsl(${customColors.background.h}, ${customColors.background.s}%, ${customColors.background.l}%)`}} />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground">Основной цвет</h3>
                      <div>
                        <Label className="text-foreground">Оттенок (H): {customColors.primary.h}°</Label>
                        <Slider
                          value={[customColors.primary.h]}
                          onValueChange={(v) => setCustomColors({...customColors, primary: {...customColors.primary, h: v[0]}})}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Насыщенность (S): {customColors.primary.s}%</Label>
                        <Slider
                          value={[customColors.primary.s]}
                          onValueChange={(v) => setCustomColors({...customColors, primary: {...customColors.primary, s: v[0]}})}
                          max={100}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Яркость (L): {customColors.primary.l}%</Label>
                        <Slider
                          value={[customColors.primary.l]}
                          onValueChange={(v) => setCustomColors({...customColors, primary: {...customColors.primary, l: v[0]}})}
                          max={100}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div className="h-12 rounded-lg" style={{backgroundColor: `hsl(${customColors.primary.h}, ${customColors.primary.s}%, ${customColors.primary.l}%)`}} />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground">Акцентный цвет</h3>
                      <div>
                        <Label className="text-foreground">Оттенок (H): {customColors.accent.h}°</Label>
                        <Slider
                          value={[customColors.accent.h]}
                          onValueChange={(v) => setCustomColors({...customColors, accent: {...customColors.accent, h: v[0]}})}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Насыщенность (S): {customColors.accent.s}%</Label>
                        <Slider
                          value={[customColors.accent.s]}
                          onValueChange={(v) => setCustomColors({...customColors, accent: {...customColors.accent, s: v[0]}})}
                          max={100}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Яркость (L): {customColors.accent.l}%</Label>
                        <Slider
                          value={[customColors.accent.l]}
                          onValueChange={(v) => setCustomColors({...customColors, accent: {...customColors.accent, l: v[0]}})}
                          max={100}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div className="h-12 rounded-lg" style={{backgroundColor: `hsl(${customColors.accent.h}, ${customColors.accent.s}%, ${customColors.accent.l}%)`}} />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground">Градиент</h3>
                      
                      <div>
                        <Label className="text-foreground">Начало - Оттенок (H): {customColors.gradientStart.h}°</Label>
                        <Slider
                          value={[customColors.gradientStart.h]}
                          onValueChange={(v) => setCustomColors({...customColors, gradientStart: {...customColors.gradientStart, h: v[0]}})}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-foreground">Середина - Оттенок (H): {customColors.gradientMid.h}°</Label>
                        <Slider
                          value={[customColors.gradientMid.h]}
                          onValueChange={(v) => setCustomColors({...customColors, gradientMid: {...customColors.gradientMid, h: v[0]}})}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-foreground">Конец - Оттенок (H): {customColors.gradientEnd.h}°</Label>
                        <Slider
                          value={[customColors.gradientEnd.h]}
                          onValueChange={(v) => setCustomColors({...customColors, gradientEnd: {...customColors.gradientEnd, h: v[0]}})}
                          max={360}
                          step={1}
                          className="mt-2"
                        />
                      </div>

                      <div className="h-20 rounded-lg gradient-bg animate-gradient-shift bg-300%" />
                    </div>
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
                    <h3 className="font-semibold text-foreground">Тест на мотоциклиста</h3>
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
                    <h3 className="font-semibold text-foreground">Официальный сайт фильма</h3>
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