import { createCar } from './GarageApi';
import { getRandomCar } from '@utils/GetRandomCar';
import { getRandomColor } from '@utils/GetRandomColor';
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
