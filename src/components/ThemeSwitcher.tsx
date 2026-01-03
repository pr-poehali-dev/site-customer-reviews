import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { playClickSound } from '@/utils/sounds';

type Theme = 'light' | 'dark' | 'custom';

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

interface ThemeSwitcherProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  customColors: CustomColors;
  setCustomColors: (colors: CustomColors) => void;
}

const ThemeSwitcher = ({ theme, setTheme, customColors, setCustomColors }: ThemeSwitcherProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-1 p-1 bg-card/50 backdrop-blur-sm rounded-lg border border-border">
        <Button
          variant={theme === 'light' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            playClickSound();
            setTheme('light');
          }}
          className="transition-all duration-300"
        >
          <Icon name="Sun" size={18} />
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            playClickSound();
            setTheme('dark');
          }}
          className="transition-all duration-300"
        >
          <Icon name="Moon" size={18} />
        </Button>
        <Button
          variant={theme === 'custom' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            playClickSound();
            setTheme('custom');
          }}
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
  );
};

export default ThemeSwitcher;