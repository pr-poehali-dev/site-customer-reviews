export const playClickSound = () => {
  const audio = new Audio('/sounds/click.mp3');
  audio.volume = 0.3;
  audio.play().catch(() => {});
};

export const playLikeSound = () => {
  const audio = new Audio('/sounds/click.mp3');
  audio.volume = 0.5;
  audio.playbackRate = 1.2;
  audio.play().catch(() => {});
};
