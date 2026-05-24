import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { characters } from '../data/characters';
import RelationMap from '../components/characters/RelationMap';
import ScrollReveal from '../components/common/ScrollReveal';
import { ROUTES } from '../utils/constants';
import styles from './CharacterDetailPage.module.css';

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const character = characters.find((c) => c.id === id);
  const { t, lang } = useI18n();

  if (!character) {
    return (
      <div className={styles.page}>
        <Link to={ROUTES.CHARACTERS} className={styles.back}>{t('characters.back')}</Link>
        <p className={styles.notFound}>{t('characters.notFound')}</p>
      </div>
    );
  }

  const { name, nameEn, aliases, aliasesEn, affiliation, description, personality, techniques, relations, firstAppearChapter, status, ending } = character;
  const displayName = lang === 'en' && nameEn ? nameEn : name;
  const displayAliases = lang === 'en' && aliasesEn && aliasesEn.length > 0 ? aliasesEn : aliases;
  const aff = lang === 'en' && character.affiliationEn ? character.affiliationEn : affiliation;
  const desc = lang === 'en' && character.descriptionEn ? character.descriptionEn : description;
  const pers = lang === 'en' && character.personalityEn ? character.personalityEn : personality;
  const end = lang === 'en' && character.endingEn ? character.endingEn : ending;
  const chapter = lang === 'en' && character.firstAppearChapterEn ? character.firstAppearChapterEn : firstAppearChapter;
  const realm = lang === 'en' && character.realmEn ? character.realmEn : character.realm;
  const techs = lang === 'en' && character.techniquesEn && character.techniquesEn.length > 0 ? character.techniquesEn : techniques;
  const aliasSep = lang === 'en' ? ', ' : '、';

  const statusMap: Record<string, string> = {
    alive: t('detail.statusAlive'),
    departed: t('detail.statusDeparted'),
    deceased: t('detail.statusDeceased'),
  };
  const statusClass: Record<string, string> = { alive: 'statusAlive', departed: 'statusDeparted', deceased: 'statusDeceased' };

  return (
    <div className={styles.page}>
      <Link to={ROUTES.CHARACTERS} className={styles.back}>{t('characters.back')}</Link>

      <div className={styles.profile}>
        <div className={styles.portrait}>
          {character.imageUrl ? (
            <img src={character.imageUrl} alt={displayName} className={styles.portraitImg} />
          ) : (
            <div className={styles.portraitEmpty}>{displayName[0]}</div>
          )}
        </div>
        <div className={styles.main}>
          <div className={styles.head}>
            <div>
              <h1 className={styles.name}>{displayName}</h1>
              {displayAliases.length > 0 && <p className={styles.aliases}>{t('characters.aka')}{displayAliases.join(aliasSep)}</p>}
            </div>
            <span className={`${styles.status} ${styles[statusClass[status]]}`}>
              {statusMap[status]}
            </span>
          </div>
          <div className={styles.meta}>
            <span className={styles.metaItem}><strong>{t('detail.affiliation')}</strong>{aff}</span>
            <span className={styles.metaItem}><strong>{t('detail.firstAppear')}</strong>{chapter}</span>
            <span className={styles.metaItem}><strong>{t('detail.realm')}</strong>{realm}</span>
          </div>
        </div>
      </div>

      <ScrollReveal>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('detail.intro')}</h2>
          <p className={styles.text}>{desc}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('detail.personality')}</h2>
          <p className={styles.text}>{pers}</p>
        </div>
      </ScrollReveal>

      {techniques.length > 0 && (
        <ScrollReveal>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('detail.techniques')}</h2>
            <div className={styles.tags}>
              {techs.map((tech, index) => (
                <span key={index} className={styles.tag}>{tech}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <div className={`${styles.section} ${styles.endingSection}`}>
          <h2 className={styles.sectionTitle}>{t('detail.ending')}</h2>
          <p className={styles.text}>{end}</p>
        </div>
      </ScrollReveal>

      <RelationMap relations={relations} />
    </div>
  );
}
