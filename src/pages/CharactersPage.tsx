import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';
import CharacterFilter from '../components/characters/CharacterFilter';
import CharacterGrid from '../components/characters/CharacterGrid';
import ScrollReveal from '../components/common/ScrollReveal';
import { characters } from '../data/characters';
import styles from './CharactersPage.module.css';

export default function CharactersPage() {
  const [tag, setTag] = useState('全部');

  const filtered = useMemo(() => {
    if (tag === '全部') return characters;
    return characters.filter((c) => c.tags.includes(tag));
  }, [tag]);

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
    <video className={styles.videoBg} src="/videos/characters-bg.mp4" autoPlay loop muted playsInline />,
    document.body
  );

  return (
    <div className={styles.page}>
      {video}
      <ScrollReveal>
        <SectionTitle title="人物志" subtitle="人界篇主要人物 · 按势力浏览" />
        <div className={styles.starLink}>
          <Link to="/starchart">✦ 进入人物星云图 · 3D交互探索 ✦</Link>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <CharacterFilter selected={tag} onChange={setTag} />
      </ScrollReveal>
      <ScrollReveal>
        <CharacterGrid characters={filtered} />
      </ScrollReveal>
      {filtered.length === 0 && (
        <p className={styles.empty}>没有匹配的人物，请调整筛选条件</p>
      )}
    </div>
  );
}
