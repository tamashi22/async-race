import anime from 'animejs';

export const animateCar = (
  velocity: number,
  id: number,
  distance: number,
  setIsRunning: (isRunning: boolean) => void,
  onFinish: (id: number) => void,
) => {
  const container = document.getElementById('race-track-container');
  const translateX = container ? container.offsetWidth - 200 : 1000;
  const scaledDistance = distance / 1000;
  const duration = Math.min((scaledDistance / velocity) * 1000, 5000);
  anime({
    targets: `#car-icon-${id}`,
    translateX: translateX,
    duration: duration,
    easing: 'linear',
    complete: () => {
      setIsRunning(false);
      onFinish(id);
    },
  });
};

export const resetAnimation = (id: number) => {
  anime.remove(`#car-icon-${id}`);
  anime({
    targets: `#car-icon-${id}`,
    translateX: 0,
    duration: 1000,
    easing: 'easeOutQuad',
  });
};
