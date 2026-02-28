import type { ReadinessLevel } from '@/types';
import styles from './ReadinessBar.module.css';

interface Props {
  readiness: ReadinessLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const READINESS_CONFIG: Record<ReadinessLevel, { label: string; width: string; colorVar: string }> = {
  'not-started': { label: 'Not Started', width: '5%', colorVar: 'var(--color-border)' },
  learning:      { label: 'Learning',    width: '35%', colorVar: 'var(--color-warning)' },
  familiar:      { label: 'Familiar',    width: '70%', colorVar: 'var(--color-primary)' },
  strong:        { label: 'Strong',      width: '100%', colorVar: 'var(--color-success)' },
};

export default function ReadinessBar({ readiness, showLabel = true, size = 'md' }: Props) {
  const config = READINESS_CONFIG[readiness];
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      {showLabel && (
        <span className={styles.label} style={{ color: config.colorVar }}>
          {config.label}
        </span>
      )}
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: config.width, background: config.colorVar }}
        />
      </div>
    </div>
  );
}
