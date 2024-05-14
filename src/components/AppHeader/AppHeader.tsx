import React from 'react';
import Logo from '@images/logo.png';
import { Link } from 'react-router-dom';
import styles from './AppHeader.module.scss';
type Props = {};

const AppHeader = (props: Props) => {
  return (
    <header className={styles.wrapper}>
      <img src={Logo} className={styles.logo} />
      <div className={styles.routes}>
        <Link to="/" className={styles.link}>
          Garage
        </Link>
        <Link to="/winners" className={styles.link}>
          Winners
        </Link>
      </div>
    </header>
  );
};
export default AppHeader;
