import { useState } from 'react';
import {
  switchEngine,
  isEngineError,
  EngineResponse,
} from '@services/EngineApi';

export const useCarEngine = (id: number) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startEngine = async (): Promise<EngineResponse | null> => {
    const response = await switchEngine(id, 'started');
    if (!isEngineError(response) && response.velocity && response.distance) {
      setIsRunning(true);
      return response;
    } else {
      //   console.error('Engine Error:', response.message);
      return null;
    }
  };

  const stopEngine = async (): Promise<boolean> => {
    const response = await switchEngine(id, 'stopped');
    setIsRunning(false);
    return !isEngineError(response);
  };

  const driveMode = async (): Promise<boolean> => {
    const response = await switchEngine(id, 'drive');
    if (!isEngineError(response) && response.success) {
      return true;
    } else {
      //   console.error('Drive Mode Error:', response.message);
      return false;
    }
  };

  return { startEngine, stopEngine, driveMode, isRunning };
};
