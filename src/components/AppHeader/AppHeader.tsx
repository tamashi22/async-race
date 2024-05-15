import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Logo from '@images/logo.png';
import styles from './AppHeader.module.scss';


const AppHeader = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname)
  return (
    <header className={styles.wrapper}>
      <img src={Logo} className={styles.logo} />
      <div className={styles.routes}>
        <Link to="/" className={clsx(styles.link, pathname == '/' && styles.active)}
        >
          Garage
        </Link>
        <Link to="/winners" className={clsx(styles.link, pathname == '/winners' && styles.active)}>
          Winners
        </Link>
      </div>
    </header >
  );
};
export default AppHeader;
