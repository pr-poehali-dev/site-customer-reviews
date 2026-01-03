import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import TrailerSection from '@/components/TrailerSection';
import ReviewsSection from '@/components/ReviewsSection';
import { FAQSection, LinksSection, SponsorsSection } from '@/components/FAQSection';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background animate-gradient-shift bg-300%">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-between gap-4 mb-12 sm:flex-row animate-fade-in">
          <h1 className="text-5xl font-bold text-glow animate-glow-pulse gradient-text">
            Мотоцикл: Проект Препятствие
          </h1>
          
          <ThemeSwitcher 
            theme={theme} 
            setTheme={setTheme} 
            customColors={customColors} 
            setCustomColors={setCustomColors} 
          />
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
            <TrailerSection />
          </TabsContent>

          <TabsContent value="reviews" className="animate-fade-in">
            <ReviewsSection 
              reviews={reviews} 
              newReview={newReview} 
              setNewReview={setNewReview} 
              handleSubmitReview={handleSubmitReview} 
            />
          </TabsContent>

          <TabsContent value="faq" className="animate-fade-in">
            <FAQSection />
          </TabsContent>

          <TabsContent value="links" className="animate-fade-in">
            <LinksSection />
          </TabsContent>

          <TabsContent value="sponsors" className="animate-fade-in">
            <SponsorsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
