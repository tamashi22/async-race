import React from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

import { IoArrowBackOutline } from "react-icons/io5";
import styles from "./AppModalBase.module.scss";

interface Props {
  onClose?(): void;
  contentClass?: string;
  backVisible?: boolean;
  onBack?(): void;
  children: React.ReactNode;
}

export const AppModalBase: React.FC<Props> = ({
  onClose,
  contentClass,
  children,
  backVisible,
  onBack,
}) => {
  return (
    <div className={styles.container}>
      <div onClick={onClose} className={styles.overlay} />
      <div className={clsx(styles.content, contentClass)}>
        {backVisible ? (
          <button onClick={onBack} className={styles.back}>
            <IoArrowBackOutline />
          </button>
        ) : null}
        <button onClick={onClose} className={styles.close}>
          <IoClose size={30} />
        </button>
        {children}
      </div>
    </div>
  );
};
