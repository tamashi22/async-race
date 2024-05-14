import React, { useState } from 'react';
import anime from 'animejs';
import { CiPlay1, CiStop1 } from 'react-icons/ci';
import { GiFinishLine } from 'react-icons/gi';
import { useCarEngine } from '@hooks/useCarEngine';
import { animateCar, resetAnimation } from 'src/utils/animations';
import { Car } from 'src/types/CarTypes';
import { CarIcon } from '@components/CarIcon';
import { Button } from '@components/ui/Button';
import { switchEngine, isEngineError } from '@services/EngineApi';
import styles from './CarRoad.module.scss';

interface CarRoadProps {
  item: Car;
}

const CarRoad: React.FC<CarRoadProps> = ({ item }) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleStartEngine = async () => {
    const startResponse = await switchEngine(item.id, 'started');
    if (
      !isEngineError(startResponse) &&
      startResponse.velocity &&
      startResponse.distance
    ) {
      setIsRunning(true);
      animateCar(startResponse.velocity, item.id, startResponse.distance); // Start animation immediately
      const success = await handleDriveMode(item.id);
      if (!success) {
        anime.remove(`#car-icon-${item.id}`);
      }
    } else if (isEngineError(startResponse)) {
      console.error(startResponse.message);
    }
  };

  const handleStopEngine = async () => {
    await switchEngine(item.id, 'stopped');
    resetAnimation(item.id); // Always reset animation when stopping
    setIsRunning(false);
  };

  const handleDriveMode = async (id: number) => {
    const driveResponse = await switchEngine(id, 'drive');
    if (!isEngineError(driveResponse) && driveResponse.success) {
      console.log('Car is now in drive mode!');
      return true;
    } else {
      if (
        isEngineError(driveResponse) &&
        driveResponse.message.includes('500')
      ) {
        console.error('Engine failure:', driveResponse.message);
        resetAnimation(id); // Reset animation if engine fails
        setIsRunning(false);
      } else {
        // console.error('Failed to switch to drive mode:', driveResponse.message);
      }
      return false;
    }
  };

  const animateCar = (velocity: number, id: number, distance: number) => {
    const container = document.getElementById('race-track-container');
    const translateX = container ? container.offsetWidth - 200 : 1000;
    const scaledDistance = distance / 1000;
    const duration = Math.min((scaledDistance / velocity) * 1000, 5000);
    anime({
      targets: `#car-icon-${id}`,
      translateX: translateX,
      duration: duration,
      easing: 'linear',
      complete: () => {
        setIsRunning(false);
        console.log(`Race ended for car ${id} in ${duration} ms`);
      },
    });
  };

  const resetAnimation = (id: number) => {
    anime.remove(`#car-icon-${id}`); // Immediately stop the animation
    anime({
      targets: `#car-icon-${id}`,
      translateX: 0,
      duration: 1000,
      easing: 'easeOutQuad',
    });
  };

  return (
    <div className={styles.track} id="race-track-container">
      <div className={styles.conrols}>
        <div>
          <Button className={styles.actionButton} disabled={isRunning}>
            Edit
          </Button>
          <Button onClick={handleStartEngine} disabled={isRunning}>
            <CiPlay1 />
          </Button>
        </div>
        <div>
          <Button className={styles.actionButton} disabled={isRunning}>
            Remove
          </Button>
          <Button onClick={handleStopEngine} disabled={!isRunning}>
            <CiStop1 />
          </Button>
        </div>
      </div>
      <CarIcon color={item.color} id={`car-icon-${item.id}`} />
      <h3 className={styles.name}>{item.name}</h3>
      <div className={styles.finish}>
        <GiFinishLine size={40} color="white" />
      </div>
    </div>
  );
};

export default CarRoad;
