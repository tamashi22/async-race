import React from 'react';

import clsx from 'clsx';

import styles from './TextField.module.scss';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeText?: (text: string) => void;
  /* component only */
  iconLeft?: any;
  label?: string;
  buttonTitle?: string;
  buttonClick?: () => void;
  errors?: string;
  withError?: boolean;
  onClear?: () => void;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      onChangeText,
      iconLeft,
      label,
      buttonTitle,
      buttonClick,
      withError,
      errors,
      className,
      onClear,
      ...props
    },
    ref,
  ) => {
    return (
      <div>
        {label ? (
          <div
            className={clsx(styles.label, errors ? styles.labelError : null)}
          >
            {label}
          </div>
        ) : null}

        <div className={styles.container}>
          {iconLeft ? (
            <div className={styles['icon-left']}>{iconLeft}</div>
          ) : null}
          <input
            ref={ref}
            className={clsx(
              styles.input,
              className,
              iconLeft ? styles[`input--iconLeft`] : '',
              buttonTitle ? styles['input--button'] : '',
            )}
            {...props}
          />
          {buttonTitle ? (
            <button onClick={buttonClick} className={clsx(styles.button)}>
              {buttonTitle}
            </button>
          ) : null}
          {/* <button className={clsx(styles.arrowIcon)}>
            <ArrowIcon />
          </button> */}
          {/* {onClear ? (
            <button className={styles.close} onClick={onClear}>
              <CloseIcon />
            </button>
          ) : null} */}
          {withError && errors ? (
            <div className={styles.error}>{errors}</div>
          ) : null}
        </div>
      </div>
    );
  },
);

TextField.displayName = 'TextField';
