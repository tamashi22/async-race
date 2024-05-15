export const getRandomColor = () => {
  const colors = 256;
  const red = Math.floor(Math.random() * colors);
  const green = Math.floor(Math.random() * colors);
  const blue = Math.floor(Math.random() * colors);
  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
};
