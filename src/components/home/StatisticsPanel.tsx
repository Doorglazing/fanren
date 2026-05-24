import { useI18n } from '../../i18n';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';
import { siteStatistics } from '../../data/statistics';
import SectionTitle from '../common/SectionTitle';
import ScrollReveal from '../common/ScrollReveal';
import styles from './StatisticsPanel.module.css';

function formatNumber(num: number, lang: string): string {
  if (lang === 'en') {
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(0)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
    return num.toLocaleString();
  }
  if (num >= 1_0000_0000) return `${(num / 1_0000_0000).toFixed(1)}亿`;
  if (num >= 1_0000) return `${(num / 1_0000).toFixed(0)}万`;
  return num.toLocaleString();
}

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  formatter?: (n: number) => string;
  delay?: number;
}

function StatCard({ label, value, suffix = '', formatter, delay = 0 }: StatCardProps) {
  const { ref, isVisible } = useScrollReveal(0.3);
  const count = useCountUp(value, 2000, isVisible);
  const display = formatter ? formatter(count) : formatNumber(count, 'zh');

  return (
    <div ref={ref} className={styles.card} style={{ animationDelay: `${delay}s` }}>
      <div className={styles.value}>
        <span className={styles.number}>{display}</span>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function StatisticsPanel() {
  const { t, lang } = useI18n();
  const stats = siteStatistics;

  const fmt = (n: number) => formatNumber(n, lang);

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <SectionTitle title={t('stats.title')} subtitle={t('stats.subtitle')} />
      </ScrollReveal>
      <div className={styles.grid}>
        <StatCard label={t('stats.views')} value={stats.bilibiliSeriesViews} formatter={fmt} delay={0} />
        <StatCard label={t('stats.favorites')} value={stats.bilibiliFavorites} formatter={fmt} delay={0.15} />
        <StatCard label={t('stats.biliRating')} value={stats.bilibiliRating * 10} formatter={(n) => (n / 10).toFixed(1)} suffix="/ 10.0" delay={0.3} />
        <StatCard label={t('stats.doubanRating')} value={stats.doubanRating * 10} formatter={(n) => (n / 10).toFixed(1)} suffix="/ 10.0" delay={0.45} />
        <StatCard label={t('stats.episodes')} value={stats.totalEpisodes} formatter={(n) => `${n}`} suffix={t('stats.episodeSuffix')} delay={0.6} />
        <StatCard label={`${t('stats.since')} · ${lang === 'en' ? stats.startDateEn : stats.startDate}`} value={0} formatter={() => lang === 'en' ? stats.durationEn : stats.duration} suffix="" delay={0.75} />
      </div>
    </section>
  );
}
