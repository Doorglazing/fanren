import type { CharacterRelation } from '../../types';
import styles from './RelationMap.module.css';

export default function RelationMap({ relations }: { relations: CharacterRelation[] }) {
  if (relations.length === 0) return null;

  return (
    <div className={styles.map}>
      <h3 className={styles.title}>人物关系</h3>
      <div className={styles.list}>
        {relations.map((r) => (
          <div key={r.targetId} className={styles.item}>
            <span className={styles.name}>{r.targetName}</span>
            <span className={styles.relation}>{r.relation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
