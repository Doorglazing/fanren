import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.viewBadge}>
          <div className={styles.viewBadgeInner}>
            <span className={styles.viewLabel}>已有</span>
            <span className={styles.viewNumber}>—</span>
            <span className={styles.viewLabel}>位道友云游至此</span>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.content}>
          <span className={styles.text}>凡人修仙传 · 人界篇</span>
          <span className={styles.separator}>◇</span>
          <span className={styles.text}>韩立修仙之路</span>
        </div>
        <p className={styles.copyright}>
          本网站为粉丝自制宣传站，内容来源网络，版权归原作者及平台所有
        </p>
      </div>
    </footer>
  );
}
