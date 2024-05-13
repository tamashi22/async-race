import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import useClickOutside from '@hooks/useClickOutside';
import styles from './PopoverPicker.module.scss';
interface PopoverPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const PopoverPicker: React.FC<PopoverPickerProps> = ({
  color,
  onChange,
}) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(popover, close);

  return (
    <div className={styles.picker}>
      <div
        className={styles.swatch}
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
