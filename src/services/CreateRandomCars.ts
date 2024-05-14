import { createCar } from './GarageApi';
import { getRandomCar, getRandomColor } from 'src/utils';
import { Car } from 'src/types/CarTypes';
export const createRandomCars = async () => {
  const promises = [];
  for (let i = 0; i < 100; i++) {
    const name = getRandomCar();
    const color = getRandomColor();
    const car = { name, color };
    promises.push(createCar(car));
  }
  await Promise.all(promises);
};
