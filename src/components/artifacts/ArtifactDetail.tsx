import { motion } from 'framer-motion';
import { useI18n } from '../../i18n';
import type { Artifact } from '../../types';
import styles from './ArtifactDetail.module.css';

export default function ArtifactDetail({ artifact, onClose }: { artifact: Artifact; onClose: () => void }) {
  const { t, lang } = useI18n();
  const name = lang === 'en' && artifact.nameEn ? artifact.nameEn : artifact.name;
  const type = lang === 'en' ? t(`atype.${artifact.type}`) : artifact.type;
  const grade = lang === 'en' && artifact.gradeEn ? artifact.gradeEn : artifact.grade;
  const ownerName = lang === 'en' && artifact.ownerNameEn ? artifact.ownerNameEn : artifact.ownerName;
  const description = lang === 'en' && artifact.descriptionEn ? artifact.descriptionEn : artifact.description;
  const abilities = lang === 'en' && artifact.abilitiesEn ? artifact.abilitiesEn : artifact.abilities;
  const acquisition = lang === 'en' && artifact.acquisitionEn ? artifact.acquisitionEn : artifact.acquisition;
  const firstAppearChapter = lang === 'en' && artifact.firstAppearChapterEn ? artifact.firstAppearChapterEn : artifact.firstAppearChapter;
  const notableUsage = lang === 'en' && artifact.notableUsageEn ? artifact.notableUsageEn : artifact.notableUsage;

  return (
    <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className={styles.card} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <div className={styles.header}>
          <span className={styles.grade}>{grade}</span>
          <span className={styles.type}>{type}</span>
        </div>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.owner}>{t('artifact.owner')}{ownerName}</p>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('artifact.intro')}</h3>
          <p className={styles.text}>{description}</p>
        </div>
        {abilities.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('artifact.abilities')}</h3>
            <div className={styles.tags}>
              {abilities.map((a, i) => (
                <span key={i} className={styles.tag}>{a}</span>
              ))}
            </div>
          </div>
        )}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('artifact.acquisition')}</h3>
          <p className={styles.text}>{acquisition}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('artifact.firstAppear')}</h3>
          <p className={styles.text}>{firstAppearChapter}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>{t('artifact.notableUsage')}</h3>
          <p className={styles.text}>{notableUsage}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
