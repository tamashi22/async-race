import React, { useState, useEffect } from 'react';
import { Car } from 'src/types/CarTypes';

import { GetCars } from '@services/GarageApi';
import CarRoad from './components/CarRoad/CarRoad';
import styles from './Garage.module.scss';

const Garage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  console.log(cars);
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await GetCars(page, 7);
        setCars(data);
      } catch (err) {
        setError('Failed to fetch cars.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [page]);

  return (
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {cars.map((car: Car) => (
            <CarRoad key={car.id} item={car} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Garage;
