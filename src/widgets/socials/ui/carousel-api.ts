export type CarouselItem = {
  id: string;
  name: string;
  caption: string;
  href: string;
  icon: string;
  color: string;
  model?: string;
  accent?: string;
};

export type CarouselApi = {
  progress: number;
  target: number;
  dragging: boolean;
  didDrag: boolean;
  hover: boolean;
  pausedUntil: number;
};

export type CarouselHandle = {
  step: (direction: number) => void;
  goTo: (index: number) => void;
  setHover: (value: boolean) => void;
};

export function createCarouselApi(): CarouselApi {
  return {
    progress: 0,
    target: 0,
    dragging: false,
    didDrag: false,
    hover: false,
    pausedUntil: 0,
  };
}

export function carouselStep(api: CarouselApi, direction: number) {
  api.target = Math.round(api.target) + direction;
  api.pausedUntil = performance.now() + 4000;
}

export function carouselGoTo(api: CarouselApi, index: number, count: number) {
  const current = ((api.progress % count) + count) % count;
  let delta = index - current;
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  api.target = api.progress + delta;
  api.pausedUntil = performance.now() + 4000;
}
