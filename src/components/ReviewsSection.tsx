import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { playClickSound } from '@/utils/sounds';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  newReview: { name: string; rating: number; comment: string };
  setNewReview: (review: { name: string; rating: number; comment: string }) => void;
  handleSubmitReview: () => void;
}

const ReviewsSection = ({ reviews, newReview, setNewReview, handleSubmitReview }: ReviewsSectionProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-2 gradient-border bg-card/80 backdrop-blur-sm animate-scale-in">
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
            onClick={() => {
              playClickSound();
              handleSubmitReview();
            }}
            className="w-full gradient-bg hover:opacity-90 transition-opacity"
          >
            <Icon name="Send" size={18} className="mr-2" />
            Отправить отзыв
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border gradient-border bg-card/80 backdrop-blur-sm animate-bounce-in hover:scale-[1.02] transition-transform">
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
    </div>
  );
};

export default ReviewsSection;