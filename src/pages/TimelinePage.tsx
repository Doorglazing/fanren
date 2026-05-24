import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ScrollPath from '../components/timeline/ScrollPath';
import styles from './TimelinePage.module.css';

export default function TimelinePage() {
  const [mode, setMode] = useState<'timeline' | 'image'>('timeline');

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
    <video className={styles.videoBg} src="/videos/timeline-bg.mp4" autoPlay loop muted playsInline />,
    document.body
  );

  return (
    <div className={styles.page}>
      {video}

      {/* Toggle */}
      <div className={styles.toggleBar}>
        <button
          className={`${styles.toggleBtn} ${mode === 'timeline' ? styles.toggleActive : ''}`}
          onClick={() => setMode('timeline')}
        >时间轴</button>
        <button
          className={`${styles.toggleBtn} ${mode === 'image' ? styles.toggleActive : ''}`}
          onClick={() => setMode('image')}
        >一图流</button>
      </div>

      {mode === 'timeline' && <ScrollPath />}

      {mode === 'image' && (
        <div className={styles.imageView}>
          <img
            src="/images/bg/timeline-full.png"
            alt="凡人修仙传时间线"
            className={styles.fullImage}
          />
        </div>
      )}
    </div>
  );
}
