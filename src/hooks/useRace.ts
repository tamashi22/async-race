import { useState, useEffect, useRef } from 'react';
import { Car } from 'src/types/CarTypes';

export const useRace = (
  cars: Car[],
  onWinnerFound: (winner: { car: Car; time: number }) => void,
) => {
  const [startRace, setStartRace] = useState<boolean>(false);
  const [resetRace, setResetRace] = useState<boolean>(false);
  const finishTimes = useRef<{ [key: number]: number }>({});
  const startTimeRef = useRef<number | null>(null);

  const handleRaceStart = () => {
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
    const winningCar = cars.find(car => car.id === id);
    if (winningCar && startTimeRef.current !== null) {
      const raceTime = (finishTime - startTimeRef.current) / 1000; // Convert milliseconds to seconds
      onWinnerFound({ car: winningCar, time: raceTime });
    }
  };

  useEffect(() => {
    if (resetRace) {
      setResetRace(false);
      finishTimes.current = {};
      startTimeRef.current = null;
    }
  }, [resetRace]);

  return {
    startRace,
    resetRace,
    handleRaceStart,
    handleRaceReset,
    handleCarFinish,
  };
};
