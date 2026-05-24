import { motion } from 'framer-motion';
import { useI18n } from '../../i18n';
import type { TimelineEvent } from '../../types';
import { EVENT_TYPE_COLORS } from '../../utils/constants';
import { characters } from '../../data/characters';
import styles from './EventDetailCard.module.css';

interface Props {
  event: TimelineEvent;
  onClose: () => void;
}

export default function EventDetailCard({ event, onClose }: Props) {
  const { t, lang } = useI18n();
  const color = EVENT_TYPE_COLORS[event.type] || '#6b6b6b';
  const typeLabel = t(`etype.${event.type}`);
  const relatedChars = event.relatedCharacterIds
    .map((id) => characters.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const relatedArtifacts = event.relatedArtifactIds;
  const title = lang === 'en' && event.titleEn ? event.titleEn : event.title;
  const timeLabel = lang === 'en' && event.timeLabelEn ? event.timeLabelEn : event.timeLabel;
  const location = lang === 'en' && event.locationEn ? event.locationEn : event.location;
  const description = lang === 'en' && event.descriptionEn ? event.descriptionEn : event.description;
  const chapter = lang === 'en' && event.chapterEn ? event.chapterEn : event.chapter;

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
          <span className={styles.timeLabel}>{timeLabel}</span>
        </div>

        <h2 className={styles.title}>{title}</h2>
        <p className={styles.location}>{location}</p>
        <div className={styles.divider} />

        <p className={styles.description}>{description}</p>

        {relatedChars.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>{t('event.relatedChars')}</h4>
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
            <h4 className={styles.sectionTitle}>{t('event.relatedArtifacts')}</h4>
            <div className={styles.artifactList}>
              {relatedArtifacts.map((id) => (
                <span key={id} className={styles.artifactItem}>
                  ···
                </span>
              ))}
            </div>
          </div>
        )}

        <p className={styles.chapter}>{t('event.source')}{chapter}</p>
      </motion.div>
    </motion.div>
  );
}
