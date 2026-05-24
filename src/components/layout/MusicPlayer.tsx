import { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayer.module.css';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/bgm.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Try autoplay
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));

    return () => { audio.pause(); audio.src = ''; };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      className={`${styles.btn} ${playing ? styles.playing : styles.paused}`}
      onClick={toggle}
      title={playing ? '暂停音乐' : '播放音乐'}
    >
      <svg viewBox="0 0 32 32" className={styles.icon}>
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="16" y="20" textAnchor="middle" fill="currentColor" fontSize="14">♪</text>
      </svg>
    </button>
  );
}
