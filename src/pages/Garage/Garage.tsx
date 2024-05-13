import React, { useState } from 'react';
import { CarIcon } from '@components/CarIcon';
import { PopoverPicker } from '@components/PopoverPicker';
import styles from "./Garage.module.scss"
const Garage = () => {
  const [color, setColor] = useState('red');

  return (
    <div>
      <CarIcon color={color} />
      <PopoverPicker color={color} onChange={setColor} />
    </div>
  );
};

export default Garage;
