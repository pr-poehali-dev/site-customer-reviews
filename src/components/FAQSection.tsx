import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
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

const FAQSection = () => {
  return (
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
  );
};

const LinksSection = () => {
  return (
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
  );
};

const SponsorsSection = () => {
  return (
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
  );
};

export { FAQSection, LinksSection, SponsorsSection };
