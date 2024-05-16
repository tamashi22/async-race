import { useState, useEffect, useRef } from 'react';
import { Car } from 'src/types/CarTypes';

interface Winner {
  car: Car;
  time: number;
}

export const useRace = (
  cars: Car[],
  onWinnerFound: (winner: Winner) => void,
) => {
  const [startRace, setStartRace] = useState(false);
  const [resetRace, setResetRace] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const winnerFoundRef = useRef(false);

  const handleRaceStart = () => {
    startTimeRef.current = performance.now();
    winnerFoundRef.current = false;
    setStartRace(true);
  };

  const handleRaceReset = () => {
    setStartRace(false);
    setResetRace(true);
  };

  const handleCarFinish = (id: number) => {
    if (winnerFoundRef.current) return;

    const finishTime = performance.now();
    const winningCar = cars.find(car => car.id === id);
    if (winningCar && startTimeRef.current !== null) {
      const raceTime = (finishTime - startTimeRef.current) / 1000;
      winnerFoundRef.current = true;
      onWinnerFound({ car: winningCar, time: raceTime });
    }
  };

  useEffect(() => {
    if (resetRace) {
      setResetRace(false);
      startTimeRef.current = null;
      winnerFoundRef.current = false;
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
