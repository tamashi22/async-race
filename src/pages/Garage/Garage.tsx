import React, { useState, useEffect, useRef } from 'react';
import { Car } from 'src/types/CarTypes';
import { GetCars } from '@services/GarageApi';
import { createRandomCars } from '@services/CreateRandomCars';
import CarRoad from './components/CarRoad/CarRoad';
import { AppPagination } from '@components/ui/AppPagination';
import { Button } from '@components/ui/Button';
import { CarModal } from './components/CarModal';
import styles from './Garage.module.scss';

const Garage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [winners, setWinners] = useState<{ car: Car; time: number }[]>([]);
  const [startRace, setStartRace] = useState<boolean>(false);
  const [resetRace, setResetRace] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCarId, setEditingCarId] = useState<number | undefined>(undefined);
  const finishTimes = useRef<{ [key: number]: number }>({});
  const startTimeRef = useRef<number | null>(null);
  const carsPerPage = 7;

  console.log(cars);
  console.log(totalCount);

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

  useEffect(() => {
    if (resetRace) {
      setResetRace(false);
      setWinners([]);
      finishTimes.current = {};
      startTimeRef.current = null;
    }
  }, [resetRace]);

  const handleRaceStart = () => {
    setWinners([]);
    finishTimes.current = {};
    startTimeRef.current = performance.now();
    setStartRace(true);
  };

  const handleRaceReset = () => {
    setStartRace(false);
    setResetRace(true);
  };

  const handleCarFinish = (id: number) => {
    const finishTime = performance.now();
    const winningCar = cars.find((car) => car.id === id);
    if (winningCar && startTimeRef.current !== null) {
      const raceTime = (finishTime - startTimeRef.current) / 1000; // Convert milliseconds to seconds
      const winnerData = { car: winningCar, time: raceTime };
      setWinners((prevWinners) => [...prevWinners, winnerData]);
      console.log('Winner:', winnerData);
    }
  };

  const goToPage = (page: number) => {
    setPage(page);
  };

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

  const handleEditCar = (carId: number) => {
    setEditingCarId(carId);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      {isModalOpen && (
        <CarModal
          carId={editingCarId}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCarId(undefined);
          }}
          onSave={() => {
            setIsModalOpen(false);
            setEditingCarId(undefined);
            fetchCars();
          }}
        />
      )}
      <div className={styles.controls}>
        <Button onClick={handleRaceStart} className="race-button">
          Start Race
        </Button>
        <Button onClick={handleRaceReset} className="reset-button">
          Reset Race
        </Button>
        <Button onClick={handleGenerateCars} className="generate-button">
          Generate 100 Cars
        </Button>
        <Button onClick={() => setIsModalOpen(true)} className="create-button">
          Create New Car
        </Button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {cars.map((car: Car) => (
            <CarRoad
              key={car.id}
              item={car}
              onFinish={handleCarFinish}
              startRace={startRace}
              resetRace={resetRace}
              onEdit={fetchCars}
            />
          ))}
        </ul>
      )}

      <h3 className={styles.count}>Garage: {totalCount}</h3>
      <AppPagination
        pageCount={Math.ceil((totalCount - 1) / carsPerPage)}
        onPageChange={(item) => {
          goToPage(item.selected + 1);
        }}

      />
    </div>
  );
};

export default Garage;
