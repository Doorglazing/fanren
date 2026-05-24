import { motion } from 'framer-motion';
import type { Artifact } from '../../types';
import styles from './ArtifactDetail.module.css';

export default function ArtifactDetail({ artifact, onClose }: { artifact: Artifact; onClose: () => void }) {
  return (
    <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className={styles.card} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <div className={styles.header}>
          <span className={styles.grade}>{artifact.grade}</span>
          <span className={styles.type}>{artifact.type}</span>
        </div>
        <h2 className={styles.name}>{artifact.name}</h2>
        <p className={styles.owner}>拥有者：{artifact.ownerName}</p>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>介绍</h3>
          <p className={styles.text}>{artifact.description}</p>
        </div>
        {artifact.abilities.length > 0 && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>能力</h3>
            <div className={styles.tags}>
              {artifact.abilities.map((a, i) => (
                <span key={i} className={styles.tag}>{a}</span>
              ))}
            </div>
          </div>
        )}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>获取方式</h3>
          <p className={styles.text}>{artifact.acquisition}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>首次出场</h3>
          <p className={styles.text}>{artifact.firstAppearChapter}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>经典使用</h3>
          <p className={styles.text}>{artifact.notableUsage}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
