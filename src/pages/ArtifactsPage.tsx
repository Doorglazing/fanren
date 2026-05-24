import { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../i18n';
import SectionTitle from '../components/common/SectionTitle';
import ArtifactCard from '../components/artifacts/ArtifactCard';
import ArtifactDetail from '../components/artifacts/ArtifactDetail';
import ScrollReveal from '../components/common/ScrollReveal';
import { artifacts } from '../data/artifacts';
import type { Artifact } from '../types';
import { cn } from '../utils/cn';
import styles from './ArtifactsPage.module.css';

const TYPE_KEYS = [
  'atype.全部', 'atype.十大至宝', 'atype.飞剑', 'atype.攻击法宝', 'atype.防御法器', 'atype.储物法器',
  'atype.辅助法宝', 'atype.灵兽/灵虫', 'atype.丹药', 'atype.阵法', 'atype.功法秘术', 'atype.灵材', 'atype.符箓', 'atype.傀儡', 'atype.火焰/神雷',
];
const TYPE_ZH = [
  '全部', '十大至宝', '飞剑', '攻击法宝', '防御法器', '储物法器',
  '辅助法宝', '灵兽/灵虫', '丹药', '阵法', '功法秘术', '灵材', '符箓', '傀儡', '火焰/神雷',
];

export default function ArtifactsPage() {
  const [type, setType] = useState('全部');
  const [selected, setSelected] = useState<Artifact | null>(null);
  const { t } = useI18n();

  const filtered = useMemo(() => {
    if (type === '全部') return artifacts;
    return artifacts.filter((a) => a.type === type);
  }, [type]);

  return (
    <div className={styles.page}>
      <ScrollReveal>
        <SectionTitle title={t('artifacts.title')} subtitle={t('artifacts.subtitle')} />
      </ScrollReveal>

      <ScrollReveal>
        <div className={styles.filterBar}>
          {TYPE_KEYS.map((key, i) => {
            const zhType = TYPE_ZH[i];
            return (
              <button
                key={zhType}
                className={cn(styles.filterPill, type === zhType && styles.filterPillActive)}
                onClick={() => setType(zhType)}
              >
                {t(key)}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      <div className={styles.grid}>
        {filtered.map((a) => (
          <ArtifactCard key={a.id} artifact={a} onClick={() => setSelected(a)} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className={styles.empty}>{t('artifacts.empty')}</p>
      )}

      {selected && createPortal(
        <ArtifactDetail artifact={selected} onClose={() => setSelected(null)} />,
        document.body
      )}
    </div>
  );
}
