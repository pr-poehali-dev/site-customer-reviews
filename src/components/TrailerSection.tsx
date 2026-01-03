import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TrailerSection = () => {
  return (
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
  );
};

export default TrailerSection;
