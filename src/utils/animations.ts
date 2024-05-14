import anime from 'animejs';

export const animateCar = (
  id: string,
  velocity: number,
  distance: number,
  containerId: string,
  onComplete: () => void,
) => {
  const container = document.getElementById(containerId);
  const translateX = container ? container.offsetWidth - 200 : 1000; // Adjust this value as needed
  const duration = (distance / velocity) * 1000; // Calculate duration based on velocity and distance
  anime({
    targets: `#car-icon-${id}`,
    translateX,
    duration,
    easing: 'linear',
    complete: onComplete,
  });
};

export const resetAnimation = (id: string) => {
  anime.remove(`#car-icon-${id}`);
  anime({
    targets: `#car-icon-${id}`,
    translateX: 0,
    duration: 1000,
    easing: 'easeOutQuad',
  });
};
