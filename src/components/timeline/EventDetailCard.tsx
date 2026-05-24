import { motion } from 'framer-motion';
import type { TimelineEvent } from '../../types';
import { EVENT_TYPE_LABELS, EVENT_TYPE_COLORS } from '../../utils/constants';
import { characters } from '../../data/characters';
import styles from './EventDetailCard.module.css';

interface Props {
  event: TimelineEvent;
  onClose: () => void;
}

export default function EventDetailCard({ event, onClose }: Props) {
  const color = EVENT_TYPE_COLORS[event.type] || '#6b6b6b';
  const typeLabel = EVENT_TYPE_LABELS[event.type] || '';
  const relatedChars = event.relatedCharacterIds
    .map((id) => characters.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const relatedArtifacts = event.relatedArtifactIds;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <div className={styles.header}>
          <span className={styles.typeBadge} style={{ color, borderColor: color }}>
            {typeLabel}
          </span>
          <span className={styles.timeLabel}>{event.timeLabel}</span>
        </div>

        <h2 className={styles.title}>{event.title}</h2>
        <p className={styles.location}>{event.location}</p>
        <div className={styles.divider} />

        <p className={styles.description}>{event.description}</p>

        {relatedChars.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>相关人物</h4>
            <div className={styles.charList}>
              {relatedChars.map((c) => (
                <span key={c.id} className={styles.charItem}>
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {relatedArtifacts.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>关联法宝</h4>
            <div className={styles.artifactList}>
              {relatedArtifacts.map((id) => (
                <span key={id} className={styles.artifactItem}>
                  ···
                </span>
              ))}
            </div>
          </div>
        )}

        <p className={styles.chapter}>出处：{event.chapter}</p>
      </motion.div>
    </motion.div>
  );
}
