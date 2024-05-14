import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

export type AppButtonVariant = 'red' | 'green' | 'gray' | 'lazuli';

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AppButtonVariant;
  fullWidth?: boolean;
  disabledVariant?: 'opacity' | 'color';
}

const Button: React.FC<AppButtonProps> = ({
  variant = 'red',
  children,
  className,
  disabledVariant = 'color',
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--disabled__${disabledVariant}`],
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
