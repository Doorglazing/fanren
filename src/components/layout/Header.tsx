import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n';
import MusicPlayer from './MusicPlayer';
import styles from './Header.module.css';

const NAV_KEYS = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.timeline', path: '/timeline' },
  { labelKey: 'nav.artifacts', path: '/artifacts' },
  { labelKey: 'nav.characters', path: '/characters' },
  { labelKey: 'nav.tianji', path: '/tianji' },
] as const;

export default function Header() {
  const { t, lang, toggleLang } = useI18n();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoText}>{t('logo.title')}</span>
          <span className={styles.logoSub}>{t('logo.subtitle')}</span>
        </NavLink>
        <nav className={styles.nav}>
          {NAV_KEYS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.navLabel}>{t(item.labelKey)}</span>
              <span className={styles.navDot} />
            </NavLink>
          ))}
          <MusicPlayer />
          <button className={styles.langBtn} onClick={toggleLang} title="Toggle language">
            {lang === 'zh' ? 'EN' : '中'}
          </button>
        </nav>
      </div>
    </header>
  );
}
