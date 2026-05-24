import { cn } from '../../utils/cn';
import styles from './CharacterFilter.module.css';

const TAGS = ['全部', '主角阵营', '早期人脉', '七玄门', '越国七派', '魔道六宗', '乱星海', '落云宗', '大晋', '天澜草原'];

interface Props {
  selected: string;
  onChange: (tag: string) => void;
}

export default function CharacterFilter({ selected, onChange }: Props) {
  return (
    <div className={styles.filters}>
      <span className={styles.label}>势力</span>
      <div className={styles.options}>
        {TAGS.map((t) => (
          <button
            key={t}
            className={cn(styles.pill, selected === t && styles.active)}
            onClick={() => onChange(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
