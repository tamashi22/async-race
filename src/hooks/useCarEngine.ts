import { useState } from 'react';
import anime from 'animejs';
import { switchEngine, isEngineError } from '@services/EngineApi';
import { animateCar, resetAnimation } from '@utils/animations';

export const useCarEngine = (carId: number, onFinish: (id: number) => void) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleStartEngine = async () => {
    const startResponse = await switchEngine(carId, 'started');
    if (
      !isEngineError(startResponse) &&
      startResponse.velocity &&
      startResponse.distance
    ) {
      setIsRunning(true);
      animateCar(
        startResponse.velocity,
        carId,
        startResponse.distance,
        setIsRunning,
        onFinish,
      );
      const success = await handleDriveMode(carId);
      if (!success) {
        anime.remove(`#car-icon-${carId}`);
      }
    } else if (isEngineError(startResponse)) {
      console.error(startResponse.message);
    }
  };

  const handleStopEngine = async () => {
    await switchEngine(carId, 'stopped');
    resetAnimation(carId);
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
        resetAnimation(id);
        setIsRunning(false);
      } else {
        // console.error('Failed to switch to drive mode:', driveResponse.message);
      }
      return false;
    }
  };

  return {
    isRunning,
    handleStartEngine,
    handleStopEngine,
  };
};
