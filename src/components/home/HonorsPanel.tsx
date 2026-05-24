import { useI18n } from '../../i18n';
import { honors } from '../../data/honors';
import ScrollReveal from '../common/ScrollReveal';
import SectionTitle from '../common/SectionTitle';
import styles from './HonorsPanel.module.css';

export default function HonorsPanel() {
  const { t, lang } = useI18n();

  return (
    <section className={styles.section}>
      <ScrollReveal>
        <SectionTitle title={t('honors.title')} subtitle={t('honors.subtitle')} />
      </ScrollReveal>
      <div className={styles.grid}>
        {honors.map((honor, i) => (
          <ScrollReveal key={honor.id} className={styles.cardWrapper}>
            <div className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.year}>{honor.year}</div>
              <h3 className={styles.cardTitle}>{lang === 'en' && honor.titleEn ? honor.titleEn : honor.title}</h3>
              <p className={styles.issuer}>{lang === 'en' && honor.issuerEn ? honor.issuerEn : honor.issuer}</p>
              <p className={styles.desc}>{lang === 'en' && honor.descriptionEn ? honor.descriptionEn : honor.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
