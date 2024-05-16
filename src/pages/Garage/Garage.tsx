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

const Garage: React.FC = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [editingCarId, setEditingCarId] = useState<number | undefined>(
    undefined,
  );
  const [winnerCreated, setWinnerCreated] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const {
    startRace,
    resetRace,
    handleRaceStart,
    handleRaceReset,
    handleCarFinish,
  } = useRace(cars, winnerData => {
    setWinners(prevWinners =>
      prevWinners.length === 0 ? [winnerData] : prevWinners,
    );
  });

  useEffect(() => {
    if (winners.length === 1 && !winnerCreated) {
      const winner = winners[0];
      setIsWinnerModalOpen(true);
      setWinnerCreated(true);
      createWinner({ id: winner.car.id, wins: 1, time: winner.time }).catch(
        async error => {
          if (
            (error as { response: { status: number } }).response?.status === 500
          ) {
            await incrementWins(winner.car.id, winner.time);
          } else {
            console.error('Failed to create or update winner:', error);
          }
        },
      );
    }
  }, [winners, winnerCreated]);

  useEffect(() => {
    if (!isWinnerModalOpen) {
      setWinners([]);
    }
  }, [isWinnerModalOpen]);

  useEffect(() => {
    fetchCars();
  }, [page]);

  const handleRaceStartWrapper = () => {
    setButtonsDisabled(true);
    handleRaceStart();
  };

  const handleRaceResetWrapper = () => {
    handleRaceReset();
    setIsWinnerModalOpen(false);
    setWinnerCreated(false);
    setButtonsDisabled(false);
  };
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
        onRaceStart={handleRaceStartWrapper}
        onRaceReset={handleRaceResetWrapper}
        onGenerateCars={handleGenerateCars}
        onCreateCar={() => setIsModalOpen(true)}
        buttonsDisabled={buttonsDisabled}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {cars.map(car => (
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
        pageCount={Math.ceil(totalCount / carsPerPage)}
        onPageChange={item => {
          goToPage(item.selected + 1);
        }}
      />
    </div>
  );
};

export default Garage;
