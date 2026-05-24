import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import type { Character } from '../../types';
import { ROUTES } from '../../utils/constants';
import styles from './CharacterCard.module.css';

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  const { id, name, nameEn, aliases, aliasesEn, affiliation, tags } = character;
  const { t, lang } = useI18n();
  const displayName = lang === 'en' && nameEn ? nameEn : name;
  const tagLabel = lang === 'en' && tags[0] ? t(`tag.${tags[0]}`) : tags[0];
  const aff = lang === 'en' && character.affiliationEn ? character.affiliationEn : affiliation;
  const aliasSep = lang === 'en' ? ', ' : '、';
  const displayAliases = lang === 'en' && aliasesEn && aliasesEn.length > 0 ? aliasesEn : aliases;

  return (
    <Link to={`${ROUTES.CHARACTERS}/${id}`} className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.name}>{displayName}</h3>
        {displayAliases.length > 0 && (
          <p className={styles.aliases}>{t('characters.aka')}{displayAliases.join(aliasSep)}</p>
        )}
        <p className={styles.affiliation}>{aff}</p>
        {tags.length > 0 && (
          <span className={styles.tag}>{tagLabel}</span>
        )}
      </div>
    </Link>
  );
}
