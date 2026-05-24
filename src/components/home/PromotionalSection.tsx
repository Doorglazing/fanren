import { useI18n } from '../../i18n';
import ScrollReveal from '../common/ScrollReveal';
import styles from './PromotionalSection.module.css';

const highlightKeys = [
  { titleKey: 'promo.h1.title', descKey: 'promo.h1.desc' },
  { titleKey: 'promo.h2.title', descKey: 'promo.h2.desc' },
  { titleKey: 'promo.h3.title', descKey: 'promo.h3.desc' },
  { titleKey: 'promo.h4.title', descKey: 'promo.h4.desc' },
];

export default function PromotionalSection() {
  const { t } = useI18n();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ScrollReveal>
          <div className={styles.synopsis}>
            <h2 className={styles.synopsisTitle}>{t('promo.synopsis')}</h2>
            <div className={styles.underline}>
              <span className={styles.underlineLine} />
              <span className={styles.underlineDot} />
              <span className={styles.underlineLine} />
            </div>
            <div className={styles.synopsisText}>
              <p>{t('promo.synopsisP1')}</p>
              <p>{t('promo.synopsisP2')}</p>
              <p>{t('promo.synopsisP3')}</p>
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.highlights}>
          {highlightKeys.map((item, i) => (
            <ScrollReveal key={i} className={styles.highlightCard}>
              <div className={styles.highlightInner}>
                <span className={styles.highlightNumber}>0{i + 1}</span>
                <h3 className={styles.highlightTitle}>{t(item.titleKey)}</h3>
                <p className={styles.highlightDesc}>{t(item.descKey)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
