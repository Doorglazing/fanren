import { useI18n } from '../../i18n';
import { cn } from '../../utils/cn';
import styles from './CharacterFilter.module.css';

const TAG_KEYS = ['characters.all', 'tag.主角阵营', 'tag.早期人脉', 'tag.七玄门', 'tag.越国七派', 'tag.魔道六宗', 'tag.乱星海', 'tag.落云宗', 'tag.大晋', 'tag.天澜草原'];
const TAG_ZH = ['全部', '主角阵营', '早期人脉', '七玄门', '越国七派', '魔道六宗', '乱星海', '落云宗', '大晋', '天澜草原'];

interface Props {
  selected: string;
  onChange: (tag: string) => void;
}

export default function CharacterFilter({ selected, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div className={styles.filters}>
      <span className={styles.label}>{t('characters.faction')}</span>
      <div className={styles.options}>
        {TAG_KEYS.map((key, i) => {
          const zhTag = TAG_ZH[i];
          return (
            <button
              key={zhTag}
              className={cn(styles.pill, selected === zhTag && styles.active)}
              onClick={() => onChange(zhTag)}
            >
              {t(key)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
