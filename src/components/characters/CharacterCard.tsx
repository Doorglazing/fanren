import { Link } from 'react-router-dom';
import type { Character } from '../../types';
import { ROUTES } from '../../utils/constants';
import styles from './CharacterCard.module.css';

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  const { id, name, aliases, affiliation, tags } = character;

  return (
    <Link to={`${ROUTES.CHARACTERS}/${id}`} className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        {aliases.length > 0 && (
          <p className={styles.aliases}>亦称：{aliases.join('、')}</p>
        )}
        <p className={styles.affiliation}>{affiliation}</p>
        {tags.length > 0 && (
          <span className={styles.tag}>{tags[0]}</span>
        )}
      </div>
    </Link>
  );
}
