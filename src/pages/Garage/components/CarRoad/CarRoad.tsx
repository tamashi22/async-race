import React, { useState, useEffect } from 'react';
import { CiPlay1, CiStop1 } from 'react-icons/ci';
import { GiFinishLine } from 'react-icons/gi';
import { Car } from 'src/types/CarTypes';
import { CarIcon } from '@components/CarIcon';
import { Button } from '@components/ui/Button';
import { useCarEngine } from '@hooks/useCarEngine';
import { CarModal } from '../CarModal';
import { deleteCar } from '@services/GarageApi';
import { deleteWinner } from '@services/WinnersApi';
import styles from './CarRoad.module.scss';

interface CarRoadProps {
  item: Car;
  onFinish: (id: number) => void;
  startRace: boolean;
  resetRace: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const CarRoad: React.FC<CarRoadProps> = ({
  item,
  onFinish,
  startRace,
  resetRace,
  onEdit,
  onDelete,
}) => {
  const { isRunning, handleStartEngine, handleStopEngine } = useCarEngine(
    item.id,
    onFinish,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (startRace) {
      handleStartEngine();
    } else if (resetRace) {
      handleStopEngine();
    }
  }, [startRace, resetRace]);

  const handleDelete = async () => {
    try {
      await deleteCar(item.id);
      deleteWinner(item.id);
      onDelete();
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  };

  return (
    <div className={styles.track} id="race-track-container">
      {isModalOpen && (
        <CarModal
          carId={item.id}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            setIsModalOpen(false);
            onEdit(); // Refresh the car data or handle the save action
          }}
        />
      )}
      <div className={styles.controls}>
        <div className={styles.contolsWrapper}>
          <Button
            className={styles.actionButton}
            disabled={isRunning}
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </Button>
          <Button onClick={handleStartEngine} disabled={isRunning}>
            <CiPlay1 />
          </Button>
        </div>
        <div className={styles.contolsWrapper}>
          <Button
            className={styles.actionButton}
            disabled={isRunning}
            onClick={handleDelete}
          >
            Remove
          </Button>
          <Button onClick={handleStopEngine} disabled={!isRunning}>
            <CiStop1 />
          </Button>
        </div>
      </div>
      <CarIcon color={item.color} id={`car-icon-${item.id}`} className={styles.carIcon} />
      <h3 className={styles.name}>{item.name}</h3>
      <div className={styles.finish}>
        <GiFinishLine size={40} color="white" />
      </div>
    </div>
  );
};

export default CarRoad;
