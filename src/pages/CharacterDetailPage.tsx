import { useParams, Link } from 'react-router-dom';
import { characters } from '../data/characters';
import RelationMap from '../components/characters/RelationMap';
import ScrollReveal from '../components/common/ScrollReveal';
import { ROUTES } from '../utils/constants';
import styles from './CharacterDetailPage.module.css';

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const character = characters.find((c) => c.id === id);

  if (!character) {
    return (
      <div className={styles.page}>
        <Link to={ROUTES.CHARACTERS} className={styles.back}>← 返回人物志</Link>
        <p className={styles.notFound}>该人物资料暂未收录</p>
      </div>
    );
  }

  const { name, aliases, affiliation, description, personality, techniques, relations, firstAppearChapter, status, ending } = character;

  const statusLabel: Record<string, string> = { alive: '在世', departed: '已离去', deceased: '已陨落' };
  const statusClass: Record<string, string> = { alive: 'statusAlive', departed: 'statusDeparted', deceased: 'statusDeceased' };

  return (
    <div className={styles.page}>
      <Link to={ROUTES.CHARACTERS} className={styles.back}>← 返回人物志</Link>

      <div className={styles.profile}>
        <div className={styles.portrait}>
          {character.imageUrl ? (
            <img src={character.imageUrl} alt={name} className={styles.portraitImg} />
          ) : (
            <div className={styles.portraitEmpty}>{name[0]}</div>
          )}
        </div>
        <div className={styles.main}>
          <div className={styles.head}>
            <div>
              <h1 className={styles.name}>{name}</h1>
              {aliases.length > 0 && <p className={styles.aliases}>亦称：{aliases.join('、')}</p>}
            </div>
            <span className={`${styles.status} ${styles[statusClass[status]]}`}>
              {statusLabel[status]}
            </span>
          </div>
          <div className={styles.meta}>
            <span className={styles.metaItem}><strong>所属势力</strong>{affiliation}</span>
            <span className={styles.metaItem}><strong>初次登场</strong>{firstAppearChapter}</span>
          </div>
        </div>
      </div>

      <ScrollReveal>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>人物介绍</h2>
          <p className={styles.text}>{description}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>性格</h2>
          <p className={styles.text}>{personality}</p>
        </div>
      </ScrollReveal>

      {techniques.length > 0 && (
        <ScrollReveal>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>功法能力</h2>
            <div className={styles.tags}>
              {techniques.map((t, index) => (
                <span key={index} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <div className={`${styles.section} ${styles.endingSection}`}>
          <h2 className={styles.sectionTitle}>人物结局</h2>
          <p className={styles.text}>{ending}</p>
        </div>
      </ScrollReveal>

      <RelationMap relations={relations} />
    </div>
  );
}
