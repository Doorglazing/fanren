import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { drawFortune, fortuneList, type FortuneEntry } from '../data/tianji';
import ScrollReveal from '../components/common/ScrollReveal';
import styles from './TianjiPage.module.css';

export default function TianjiPage() {
  const [result, setResult] = useState<FortuneEntry | null>(null);

  useEffect(() => {
    const root = document.getElementById('root');
    const prevBg = document.body.style.background;
    const prevPos = root?.style.position || '';
    const prevZ = root?.style.zIndex || '';
    document.body.style.background = 'transparent';
    if (root) { root.style.position = 'relative'; root.style.zIndex = '1'; }
    return () => {
      document.body.style.background = prevBg;
      if (root) { root.style.position = prevPos; root.style.zIndex = prevZ; }
    };
  }, []);

  const video = createPortal(
    <video className={styles.videoBg} src="/videos/tianji-bg.mp4" autoPlay loop muted playsInline />,
    document.body
  );
  const [drawing, setDrawing] = useState(false);

  const handleDraw = useCallback(() => {
    if (drawing) return;
    setDrawing(true);
    setResult(null);
    setTimeout(() => {
      setResult(drawFortune());
      setDrawing(false);
    }, 800);
  }, [drawing]);

  const levelLabel = (level: number) => {
    if (level <= 1) return '上上签';
    if (level <= 3) return '吉签';
    if (level === 4) return '平签';
    if (level <= 6) return '下签';
    return '凶签';
  };

  return (
    <div className={styles.page}>
      {video}
      <ScrollReveal>
        <div className={styles.header}>
          <h1 className={styles.title}>天机阁</h1>
          <p className={styles.subtitle}>窥探天机，知晓今日运势</p>
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerDot} />
            <span className={styles.dividerLine} />
          </div>
        </div>
      </ScrollReveal>

      {/* Fortune result */}
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key={result.id}
            className={`${styles.resultCard} ${styles[`bg-${result.bgEffect}`] || ''}`}
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className={styles.particles}>
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className={styles.particle}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                    background: result.color,
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                  }}
                />
              ))}
            </div>

            <div className={styles.sealArea}>
              <div className={styles.sealRing} style={{ borderColor: result.color }}>
                <span className={styles.signLabel}>{levelLabel(result.level)}</span>
                <span className={styles.fortuneName} style={{ color: result.color }}>
                  {result.name}
                </span>
              </div>
            </div>

            <div className={styles.storySection}>
              <div className={styles.storyDivider}>
                <span className={styles.storyLine} />
                <span className={styles.storyIcon}>✦</span>
                <span className={styles.storyLine} />
              </div>
              <h3 className={styles.storyTitle}>{result.story.title}</h3>
              <p className={styles.storyText}>{result.story.text}</p>
            </div>

            <button className={styles.drawAgainBtn} onClick={handleDraw} disabled={drawing}>
              再窥一次天机
            </button>
          </motion.div>
        ) : drawing ? (
          <motion.div
            key="drawing"
            className={styles.drawingCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.inkSpread}>
              <div className={styles.inkCircle} />
            </div>
            <p className={styles.drawingText}>天机推演中…</p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className={styles.emptyCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className={styles.sealContainer}>
              <svg viewBox="0 0 120 120" className={styles.sealSvg}>
                <rect x="10" y="10" width="100" height="100" rx="6" fill="none" stroke="var(--vermillion)" strokeWidth="2.5" opacity="0.3" />
                <rect x="18" y="18" width="84" height="84" rx="3" fill="none" stroke="var(--vermillion)" strokeWidth="0.8" opacity="0.2" />
                <text x="60" y="55" textAnchor="middle" fill="var(--vermillion)" fontFamily="var(--font-display)" fontSize="18" opacity="0.4">天</text>
                <text x="60" y="80" textAnchor="middle" fill="var(--vermillion)" fontFamily="var(--font-display)" fontSize="18" opacity="0.4">机</text>
              </svg>
            </div>
            <p className={styles.emptyText}>天机不可轻泄，道心不可妄动</p>
            <p className={styles.emptyHint}>按下按钮，窥探属于你的今日运势</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draw button */}
      <div className={styles.btnArea}>
        <button
          className={styles.drawBtn}
          onClick={handleDraw}
          disabled={drawing}
        >
          <span className={styles.btnIcon}>☯</span>
          窥探今日天机
          <span className={styles.btnIcon}>☯</span>
        </button>
      </div>

      {/* All fortunes reference */}
      <ScrollReveal>
        <div className={styles.reference}>
          <h3 className={styles.refTitle}>运势一览</h3>
          <div className={styles.refGrid}>
            {fortuneList.map((f) => (
              <div key={f.name} className={styles.refItem}>
                <span className={styles.refDot} style={{ background: f.color }} />
                <span className={styles.refName}>{f.name}</span>
                <span className={styles.refDesc}>{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
