import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useI18n();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/visitors')
      .then(r => r.json())
      .then(d => setCount(d.count))
      .catch(() => setCount(0));
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.viewBadge}>
          <div className={styles.viewBadgeInner}>
            <span className={styles.viewLabel}>{t('footer.visited1')}</span>
            <span className={styles.viewNumber}>{count !== null ? count.toLocaleString() : '—'}</span>
            <span className={styles.viewLabel}>{t('footer.visited2')}</span>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.content}>
          <span className={styles.text}>{t('footer.text1')}</span>
          <span className={styles.separator}>◇</span>
          <span className={styles.text}>{t('footer.text2')}</span>
        </div>
        <p className={styles.copyright}>
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
