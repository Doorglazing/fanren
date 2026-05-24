import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import SectionTitle from '../components/common/SectionTitle';
import CharacterFilter from '../components/characters/CharacterFilter';
import CharacterGrid from '../components/characters/CharacterGrid';
import ScrollReveal from '../components/common/ScrollReveal';
import { characters } from '../data/characters';
import styles from './CharactersPage.module.css';

export default function CharactersPage() {
  const [tag, setTag] = useState('全部');
  const { t } = useI18n();

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
        <SectionTitle title={t('characters.title')} subtitle={t('characters.subtitle')} />
        <div className={styles.starLink}>
          <Link to="/starchart">{t('characters.starLink')}</Link>
        </div>
      </ScrollReveal>
      <ScrollReveal>
        <CharacterFilter selected={tag} onChange={setTag} />
      </ScrollReveal>
      <ScrollReveal>
        <CharacterGrid characters={filtered} />
      </ScrollReveal>
      {filtered.length === 0 && (
        <p className={styles.empty}>{t('characters.empty')}</p>
      )}
    </div>
  );
}
