import type { CharacterRelation } from '../../types';
import { useI18n } from '../../i18n';
import styles from './RelationMap.module.css';

export default function RelationMap({ relations }: { relations: CharacterRelation[] }) {
  const { t, lang } = useI18n();
  if (relations.length === 0) return null;

  return (
    <div className={styles.map}>
      <h3 className={styles.title}>{t('detail.relations')}</h3>
      <div className={styles.list}>
        {relations.map((r) => (
          <div key={r.targetId} className={styles.item}>
            <span className={styles.name}>{lang === 'en' && r.targetNameEn ? r.targetNameEn : r.targetName}</span>
            <span className={styles.relation}>{lang === 'en' && r.relationEn ? r.relationEn : r.relation}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
