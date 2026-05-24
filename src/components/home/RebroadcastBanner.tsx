import { useState, useEffect } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import styles from './RebroadcastBanner.module.css';

function getCountdown() {
  const target = new Date('2026-06-13T12:00:00+08:00').getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

export default function RebroadcastBanner() {
  const [cd, setCd] = useState(getCountdown());

  useEffect(() => {
    const t = setInterval(() => setCd(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      <ScrollReveal>
        <div className={styles.content}>
          <div className={styles.badge}>重磅回归</div>
          <h2 className={styles.title}>
            <span className={styles.titleAccent}>慕兰之战</span>
          </h2>
          <p className={styles.subtitle}>年番复播 · 荣耀归来</p>
          <div className={styles.date}>2026 年 6 月 13 日</div>

          {cd.days === 0 && cd.hours === 0 && cd.mins === 0 && cd.secs === 0 ? (
            <div className={styles.liveNow}>已开播，请道友速回宗门</div>
          ) : (
            <div className={styles.countdown}>
              {[
                { v: cd.days, l: '天' },
                { v: cd.hours, l: '时' },
                { v: cd.mins, l: '分' },
                { v: cd.secs, l: '秒' },
              ].map((item) => (
                <div key={item.l} className={styles.cdItem}>
                  <span className={styles.cdNum}>{String(item.v).padStart(2, '0')}</span>
                  <span className={styles.cdLabel}>{item.l}</span>
                </div>
              ))}
            </div>
          )}

          <p className={styles.desc}>
            韩立元婴大成，慕兰大战一触即发。新篇章、新建模、新特效 —— 国漫天花板荣耀归来。
          </p>

          <a
            className={styles.bilibiliLink}
            href="https://www.bilibili.com/bangumi/play/ep733316?spm_id_from=333.337.0.0&from_spmid=666.25.episode.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.linkIcon}>▶</span>
            前往 B 站观看凡人修仙传
            <span className={styles.linkArrow}>→</span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
