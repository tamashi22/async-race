import React from 'react';
import { Button } from '@components/ui/Button';
import styles from './GarageContols.module.scss';
interface GarageControlsProps {
  onRaceStart: () => void;
  onRaceReset: () => void;
  onGenerateCars: () => void;
  onCreateCar: () => void;
}

const GarageControls: React.FC<GarageControlsProps> = ({
  onRaceStart,
  onRaceReset,
  onGenerateCars,
  onCreateCar,
}) => {
  return (
    <div className={styles.contols}>
      <div className={styles.buttonsWrapper}>
        <Button onClick={onRaceStart} className="race-button">
          Start Race
        </Button>
        <Button onClick={onRaceReset} className="reset-button">
          Reset Race
        </Button>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button onClick={onCreateCar} className="create-button">
          Create New Car
        </Button>
        <Button onClick={onGenerateCars} className="generate-button">
          Generate 100 Cars
        </Button>
      </div>
    </div>
  );
};

export default GarageControls;
