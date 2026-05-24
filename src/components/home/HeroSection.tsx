import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

export default function HeroSection() {
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
            <span className={styles.titleChar}>凡</span>
            <span className={styles.titleChar}>人</span>
            <span className={styles.titleChar}>修</span>
            <span className={styles.titleChar}>仙</span>
            <span className={styles.titleChar}>传</span>
          </h1>
          <span className={styles.subtitle}>人界篇</span>
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDot} />
            <span className={styles.dividerLine} />
          </div>
          <p className={styles.desc}>
            资质平庸的山村少年，意外踏入修仙之途
          </p>
          <p className={styles.desc2}>
            步步为营，以凡人之躯，证道长生
          </p>
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
            <text x="50" y="58" textAnchor="middle" fill="var(--vermillion)" fontFamily="var(--font-display)" fontSize="22" letterSpacing="0.3em">韩 立</text>
          </svg>
        </motion.div>
      </div>

      <div className={styles.scrollHint}>
        <span className={styles.scrollHintText}>向下探索</span>
        <span className={styles.scrollHintArrow}>▼</span>
      </div>
    </section>
  );
}
