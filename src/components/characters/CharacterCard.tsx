import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import type { Character } from '../../types';
import { ROUTES } from '../../utils/constants';
import styles from './CharacterCard.module.css';

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  const { id, name, aliases, affiliation, tags } = character;
  const { t, lang } = useI18n();

  const tagLabel = lang === 'en' && tags[0] ? t(`tag.${tags[0]}`) : tags[0];

  return (
    <Link to={`${ROUTES.CHARACTERS}/${id}`} className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        {aliases.length > 0 && (
          <p className={styles.aliases}>{t('characters.aka')}{aliases.join('、')}</p>
        )}
        <p className={styles.affiliation}>{affiliation}</p>
        {tags.length > 0 && (
          <span className={styles.tag}>{tagLabel}</span>
        )}
      </div>
    </Link>
  );
}
