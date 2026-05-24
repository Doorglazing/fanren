import { useEffect, useState, useRef } from 'react';
import styles from './InkBrush.module.css';

interface Props {
  className?: string;
}

export default function InkBrush({ className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.container} ${className}`}>
      <svg
        className={`${styles.brush} ${visible ? styles.animated : ''}`}
        width="100%"
        height="60"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30 Q100 10 200 28 Q350 50 500 25 Q650 5 800 30 Q950 50 1100 25 Q1150 20 1200 30"
          fill="none"
          stroke="var(--ink-faint)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M0 30 Q100 10 200 28 Q350 50 500 25 Q650 5 800 30 Q950 50 1100 25 Q1150 20 1200 30"
          fill="none"
          stroke="var(--vermillion)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0"
          className={visible ? styles.accentStroke : ''}
        />
      </svg>
    </div>
  );
}
