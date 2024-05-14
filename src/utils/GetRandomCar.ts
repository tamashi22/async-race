import { carMarks, carModels } from 'src/constants/CarsArr';
const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];
export const getRandomCar = () => {
  return `${getRandomElement(carMarks)} ${getRandomElement(carModels)}`;
};
