import type { Artifact } from '../../types';
import styles from './ArtifactCard.module.css';

export default function ArtifactCard({ artifact, onClick }: { artifact: Artifact; onClick: () => void }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <span className={styles.grade}>{artifact.grade}</span>
        <span className={styles.type}>{artifact.type}</span>
      </div>
      <h3 className={styles.name}>{artifact.name}</h3>
      <p className={styles.owner}>{artifact.ownerName}</p>
      <p className={styles.desc}>{artifact.description.slice(0, 60)}…</p>
    </div>
  );
}
