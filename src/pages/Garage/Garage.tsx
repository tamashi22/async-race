import React, { useState, useEffect } from 'react';
import { Car } from 'src/types/CarTypes';
import { useGarage } from '@hooks/useGarage';
import { useRace } from '@hooks/useRace';
import CarRoad from './components/CarRoad/CarRoad';
import { AppPagination } from '@components/ui/AppPagination';
import { GarageControls } from './components/GarageContols';
import { CarModal } from './components/CarModal';
import { WinnerModal } from './components/WinnerModal';
import { createWinner, incrementWins } from '@services/WinnersApi';
import styles from './Garage.module.scss';

const carsPerPage = 7;

const Garage = () => {
  const {
    cars,
    page,
    totalCount,
    isLoading,
    error,
    setPage,
    fetchCars,
    handleGenerateCars,
  } = useGarage(carsPerPage);

  const [winners, setWinners] = useState<{ car: Car; time: number }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState<boolean>(false);
  const [editingCarId, setEditingCarId] = useState<number | undefined>(undefined);

  const { startRace, resetRace, handleRaceStart, handleRaceReset, handleCarFinish } = useRace(cars, (winnerData) => {
    setWinners((prevWinners) => {
      if (prevWinners.length === 0) {
        return [winnerData];
      }
      return prevWinners;
    });
  });

  useEffect(() => {
    if (winners.length === 1) {
      const winner = winners[0];
      setIsWinnerModalOpen(true);
      createWinner({ id: winner.car.id, wins: 1, time: winner.time }).catch(async (error) => {
        if ((error as { response: { status: number } }).response?.status === 500) {
          await incrementWins(winner.car.id, winner.time);
        } else {
          console.error('Failed to create or update winner:', error);
        }
      });
    }
  }, [winners]);

  useEffect(() => {
    if (!isWinnerModalOpen) {
      setWinners([]);
    }
  }, [isWinnerModalOpen]);

  const goToPage = (page: number) => {
    setPage(page);
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
      {isWinnerModalOpen && winners[0] && (
        <WinnerModal
          winner={winners[0]}
          onClose={() => setIsWinnerModalOpen(false)}
        />
      )}
      <GarageControls
        onRaceStart={handleRaceStart}
        onRaceReset={() => {
          handleRaceReset();
          setIsWinnerModalOpen(false); // Reset the modal state
        }}
        onGenerateCars={handleGenerateCars}
        onCreateCar={() => setIsModalOpen(true)}
      />
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
              onDelete={fetchCars}
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
