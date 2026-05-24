import type { Character } from '../../types';
import CharacterCard from './CharacterCard';
import styles from './CharacterGrid.module.css';

interface Props {
  characters: Character[];
}

export default function CharacterGrid({ characters }: Props) {
  return (
    <div className={styles.grid}>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
