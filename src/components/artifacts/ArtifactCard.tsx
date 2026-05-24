import type { Artifact } from '../../types';
import { useI18n } from '../../i18n';
import styles from './ArtifactCard.module.css';

export default function ArtifactCard({ artifact, onClick }: { artifact: Artifact; onClick: () => void }) {
  const { t, lang } = useI18n();
  const name = lang === 'en' && artifact.nameEn ? artifact.nameEn : artifact.name;
  const type = lang === 'en' ? t(`atype.${artifact.type}`) : artifact.type;
  const grade = lang === 'en' && artifact.gradeEn ? artifact.gradeEn : artifact.grade;
  const ownerName = lang === 'en' && artifact.ownerNameEn ? artifact.ownerNameEn : artifact.ownerName;
  const desc = lang === 'en' && artifact.descriptionEn ? artifact.descriptionEn : artifact.description;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <span className={styles.grade}>{grade}</span>
        <span className={styles.type}>{type}</span>
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.owner}>{ownerName}</p>
      <p className={styles.desc}>{desc.slice(0, 80)}…</p>
    </div>
  );
}
