import { useState, useEffect } from 'react';
import { Car } from 'src/types/CarTypes';
import { GetCars } from '@services/GarageApi';
import { createRandomCars } from '@services/CreateRandomCars';

export const useGarage = (carsPerPage: number) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { cars, totalCount } = await GetCars(page, carsPerPage);
      setCars(cars);
      setTotalCount(totalCount);
    } catch (err) {
      setError('Failed to fetch cars.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [page]);

  const handleGenerateCars = async () => {
    setIsLoading(true);
    try {
      await createRandomCars();
      await fetchCars();
    } catch (err) {
      setError('Failed to generate cars.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cars,
    page,
    totalCount,
    isLoading,
    error,
    setPage,
    fetchCars,
    handleGenerateCars,
  };
};
