import { honors } from '../../data/honors';
import ScrollReveal from '../common/ScrollReveal';
import SectionTitle from '../common/SectionTitle';
import styles from './HonorsPanel.module.css';

export default function HonorsPanel() {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <SectionTitle title="荣誉殿堂" subtitle="国漫标杆的荣耀之路" />
      </ScrollReveal>
      <div className={styles.grid}>
        {honors.map((honor, i) => (
          <ScrollReveal key={honor.id} className={styles.cardWrapper}>
            <div className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.year}>{honor.year}</div>
              <h3 className={styles.cardTitle}>{honor.title}</h3>
              <p className={styles.issuer}>{honor.issuer}</p>
              <p className={styles.desc}>{honor.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
