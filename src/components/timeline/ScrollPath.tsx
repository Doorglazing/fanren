import { useState } from 'react';
import { useI18n } from '../../i18n';
import { timelineEvents } from '../../data/timeline';
import EventDetailCard from './EventDetailCard';
import type { TimelineEvent } from '../../types';
import { EVENT_TYPE_COLORS } from '../../utils/constants';
import styles from './ScrollPath.module.css';

const VB = 100;
const pos = (e: TimelineEvent) => e.positionPercent;

function smoothPath(events: TimelineEvent[]): string {
  const s = [...events].sort((a, b) => a.sortOrder - b.sortOrder);
  if (s.length < 2) return '';
  const pts = s.map(e => ({ x: pos(e).x, y: pos(e).y }));
  const n = pts.length;

  let d = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 >= n ? n - 1 : i + 2];

    const t1x = (p2.x - p0.x) * 0.5;
    const t1y = (p2.y - p0.y) * 0.5;
    const t2x = (p3.x - p1.x) * 0.5;
    const t2y = (p3.y - p1.y) * 0.5;

    const cp1x = p1.x + t1x / 3;
    const cp1y = p1.y + t1y / 3;
    const cp2x = p2.x - t2x / 3;
    const cp2y = p2.y - t2y / 3;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function ScrollPath() {
  const [sel, setSel] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useI18n();
  const sorted = [...timelineEvents].sort((a, b) => a.sortOrder - b.sortOrder);
  const pathD = smoothPath(timelineEvents);
  const selected = timelineEvents.find((e) => e.id === sel) || null;

  return (
    <div className={styles.container}>
      <div className={styles.canvas}>
        <svg viewBox={`0 0 ${VB} ${VB}`} className={styles.svg} preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="n1"><feGaussianBlur in="SourceGraphic" stdDeviation="0.6"/><feMerge><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="n2"><feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <filter id="n3"><feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b8c5a"/><stop offset="35%" stopColor="#c4a84b"/>
              <stop offset="65%" stopColor="#c03b3b"/><stop offset="100%" stopColor="#e8d48b"/>
            </linearGradient>
          </defs>

          <path d={pathD} fill="none" stroke="url(#fg)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.1" filter="url(#n3)"/>
          <path d={pathD} fill="none" stroke="url(#fg)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" filter="url(#n2)"/>
          <path d={pathD} fill="none" stroke="url(#fg)" strokeWidth="0.45" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" filter="url(#n1)"/>
          <path d={pathD} fill="none" stroke="#fff" strokeWidth="0.14" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>

          {sorted.map((e, idx) => {
            const p = pos(e);
            const cx = p.x, cy = p.y;
            const color = EVENT_TYPE_COLORS[e.type] || '#666';
            const typeLabel = t(`etype.${e.type}`);
            const isSel = sel === e.id;
            const isHov = hovered === e.id;
            const right = idx % 2 === 0;
            const lx = cx + (right ? 4 : -4);
            const ta = right ? 'start' : 'end';
            const active = isSel || isHov;

            return (
              <g
                key={e.id}
                style={{cursor:'pointer'}}
                onClick={() => setSel(isSel ? null : e.id)}
                onMouseEnter={() => setHovered(e.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={cx} cy={cy} r={active ? 4.5 : 2.2} fill={color} opacity={active ? 0.2 : 0.06} filter="url(#n2)">
                  {isSel && <animate attributeName="r" values="4.5;6;4.5" dur="1.8s" repeatCount="indefinite"/>}
                </circle>
                <circle cx={cx} cy={cy} r={active ? 1.5 : 1} fill="rgba(0,0,0,0.5)" stroke={color} strokeWidth={active ? 0.35 : 0.22}/>
                <circle cx={cx} cy={cy} r={active ? 0.6 : 0.35} fill={color} filter="url(#n1)"/>

                <text x={lx} y={cy - 1.2} fill={active ? color : '#fff'} stroke="rgba(0,0,0,0.6)" strokeWidth="0.45" paintOrder="stroke fill" fontFamily="var(--font-display)" fontSize={active ? 2.8 : 2.4} fontWeight="bold" textAnchor={ta} letterSpacing="0.03em">{e.title}</text>
                <text x={lx} y={cy + 2.8} fill={active ? '#fff' : 'rgba(255,255,255,0.7)'} stroke="rgba(0,0,0,0.5)" strokeWidth="0.35" paintOrder="stroke fill" fontFamily="var(--font-display)" fontSize="1.5" textAnchor={ta} letterSpacing="0.04em">{e.timeLabel}</text>
                <text x={lx} y={cy + 5} fill={color} stroke="rgba(0,0,0,0.45)" strokeWidth="0.3" paintOrder="stroke fill" fontFamily="var(--font-display)" fontSize="1.3" fontWeight="bold" textAnchor={ta} letterSpacing="0.03em">{typeLabel}</text>
              </g>
            );
          })}

          <circle cx={pos(sorted[0]).x} cy={pos(sorted[0]).y} r="2.2" fill="none" stroke="#c03b3b" strokeWidth="0.3" strokeDasharray="0.6 0.5" opacity="0.4"/>
          <text x={pos(sorted[0]).x - 4} y={pos(sorted[0]).y + 5} fill="#e8d48b" fontFamily="var(--font-display)" fontSize="2" textAnchor="end">{t('timeline.start')}</text>
          <circle cx={pos(sorted[sorted.length-1]).x} cy={pos(sorted[sorted.length-1]).y} r="2.2" fill="rgba(0,0,0,0.4)" stroke="#c4a84b" strokeWidth="0.4" opacity="0.7" filter="url(#n1)"/>
          <circle cx={pos(sorted[sorted.length-1]).x} cy={pos(sorted[sorted.length-1]).y} r="0.5" fill="#c4a84b"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/></circle>
          <text x={pos(sorted[sorted.length-1]).x + 3.5} y={pos(sorted[sorted.length-1]).y - 3} fill="#c4a84b" fontFamily="var(--font-display)" fontSize="2.2" fontWeight="bold">{t('timeline.end')}</text>
        </svg>
      </div>

      <div className={styles.hint}>{t('timeline.hint')}</div>

      {selected && <EventDetailCard event={selected} onClose={() => setSel(null)} />}
    </div>
  );
}
