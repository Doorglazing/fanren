import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/constants';
import MusicPlayer from './MusicPlayer';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoText}>凡人修仙传</span>
          <span className={styles.logoSub}>人界篇</span>
        </NavLink>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.navLabel}>{item.label}</span>
              <span className={styles.navDot} />
            </NavLink>
          ))}
          <MusicPlayer />
        </nav>
      </div>
    </header>
  );
}
