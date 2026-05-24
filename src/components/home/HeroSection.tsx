import { motion } from 'framer-motion';
import { useI18n } from '../../i18n';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const { t, lang } = useI18n();
  const titleChars = lang === 'zh' ? ['凡', '人', '修', '仙', '传'] : t('hero.title').split('');

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <motion.div
          className={styles.titleGroup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          <h1 className={styles.title}>
            {titleChars.map((ch, i) => (
              <span key={i} className={styles.titleChar}>{ch}</span>
            ))}
          </h1>
          <span className={styles.subtitle}>{t('hero.subtitle')}</span>
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDot} />
            <span className={styles.dividerLine} />
          </div>
          <p className={styles.desc}>{t('hero.desc1')}</p>
          <p className={styles.desc2}>{t('hero.desc2')}</p>
        </motion.div>

        <motion.div
          className={styles.seal}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: -3 }}
          transition={{ delay: 1, duration: 0.7, ease: 'backOut' }}
        >
          <svg viewBox="0 0 100 100" width="90" height="90">
            <rect x="6" y="6" width="88" height="88" rx="4" fill="none" stroke="var(--vermillion)" strokeWidth="3.5" />
            <rect x="13" y="13" width="74" height="74" rx="2" fill="none" stroke="var(--vermillion)" strokeWidth="1" />
            <text x="50" y="58" textAnchor="middle" fill="var(--vermillion)" fontFamily="var(--font-display)" fontSize="22" letterSpacing="0.3em">{t('hero.seal')}</text>
          </svg>
        </motion.div>
      </div>

      <div className={styles.scrollHint}>
        <span className={styles.scrollHintText}>{t('hero.scroll')}</span>
        <span className={styles.scrollHintArrow}>▼</span>
      </div>
    </section>
  );
}
