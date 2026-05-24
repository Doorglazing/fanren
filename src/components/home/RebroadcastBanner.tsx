import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';
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
  const { t } = useI18n();

  useEffect(() => {
    const timer = setInterval(() => setCd(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>

      <ScrollReveal>
        <div className={styles.content}>
          <div className={styles.badge}>{t('rebadge')}</div>
          <h2 className={styles.title}>
            <span className={styles.titleAccent}>{t('rebadge.title')}</span>
          </h2>
          <p className={styles.subtitle}>{t('rebadge.subtitle')}</p>
          <div className={styles.date}>{t('rebadge.date')}</div>

          {cd.days === 0 && cd.hours === 0 && cd.mins === 0 && cd.secs === 0 ? (
            <div className={styles.liveNow}>{t('rebadge.live')}</div>
          ) : (
            <div className={styles.countdown}>
              {[
                { v: cd.days, l: t('rebadge.days') },
                { v: cd.hours, l: t('rebadge.hours') },
                { v: cd.mins, l: t('rebadge.mins') },
                { v: cd.secs, l: t('rebadge.secs') },
              ].map((item) => (
                <div key={item.l} className={styles.cdItem}>
                  <span className={styles.cdNum}>{String(item.v).padStart(2, '0')}</span>
                  <span className={styles.cdLabel}>{item.l}</span>
                </div>
              ))}
            </div>
          )}

          <p className={styles.desc}>{t('rebadge.desc')}</p>

          <a
            className={styles.bilibiliLink}
            href="https://www.bilibili.com/bangumi/play/ep733316?spm_id_from=333.337.0.0&from_spmid=666.25.episode.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.linkIcon}>▶</span>
            {t('rebadge.link')}
            <span className={styles.linkArrow}>→</span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
