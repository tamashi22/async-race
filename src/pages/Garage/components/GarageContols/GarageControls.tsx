import React from 'react';
import { Button } from '@components/ui/Button';
import styles from './GarageContols.module.scss';

interface GarageControlsProps {
  onRaceStart: () => void;
  onRaceReset: () => void;
  onGenerateCars: () => void;
  onCreateCar: () => void;
  buttonsDisabled: boolean;
}

const GarageControls: React.FC<GarageControlsProps> = ({
  onRaceStart,
  onRaceReset,
  onGenerateCars,
  onCreateCar,
  buttonsDisabled,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.buttonsWrapper}>
        <Button onClick={onRaceStart} disabled={buttonsDisabled}>
          Start Race
        </Button>
        <Button onClick={onRaceReset}>Reset Race</Button>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button onClick={onCreateCar} disabled={buttonsDisabled}>
          Create New Car
        </Button>
        <Button onClick={onGenerateCars} disabled={buttonsDisabled}>
          Generate 100 Cars
        </Button>
      </div>
    </div>
  );
};

export default GarageControls;
