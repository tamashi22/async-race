import React from 'react';
import clsx from 'clsx';
import Logo from '@images/logo.png';
import styles from './AppHeader.module.scss';

interface AppHeaderProps {
  currentView: 'garage' | 'winners';
  setCurrentView: (view: 'garage' | 'winners') => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  currentView,
  setCurrentView,
}) => {
  return (
    <header className={styles.wrapper}>
      <img src={Logo} className={styles.logo} alt="logo" />
      <div className={styles.routes}>
        <button
          className={clsx(
            styles.link,
            currentView === 'garage' && styles.active,
          )}
          onClick={() => setCurrentView('garage')}
        >
          Garage
        </button>
        <button
          className={clsx(
            styles.link,
            currentView === 'winners' && styles.active,
          )}
          onClick={() => setCurrentView('winners')}
        >
          Winners
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
