import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCountUp } from '../../hooks/useCountUp';
import { siteStatistics } from '../../data/statistics';
import SectionTitle from '../common/SectionTitle';
import ScrollReveal from '../common/ScrollReveal';
import styles from './StatisticsPanel.module.css';

function formatNumber(num: number): string {
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
  const display = formatter ? formatter(count) : formatNumber(count);

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
  const stats = siteStatistics;

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <SectionTitle title="数据概览" subtitle="B站国创现象级作品" />
      </ScrollReveal>
      <div className={styles.grid}>
        <StatCard label="系列累计播放量" value={stats.bilibiliSeriesViews} delay={0} />
        <StatCard label="B站追番人数" value={stats.bilibiliFavorites} delay={0.15} />
        <StatCard label="B站评分" value={stats.bilibiliRating * 10} formatter={(n) => (n / 10).toFixed(1)} suffix="/ 10.0" delay={0.3} />
        <StatCard label="豆瓣评分" value={stats.doubanRating * 10} formatter={(n) => (n / 10).toFixed(1)} suffix="/ 10.0" delay={0.45} />
        <StatCard label="已播出集数" value={stats.totalEpisodes} formatter={(n) => `${n}`} suffix="集" delay={0.6} />
        <StatCard label={`开播至今 · ${stats.startDate}`} value={0} formatter={() => stats.duration} suffix="" delay={0.75} />
      </div>
    </section>
  );
}
