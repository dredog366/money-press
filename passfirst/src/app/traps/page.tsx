'use client';

import { useState } from 'react';
import { TRAP_PAIRS } from '@/data/traps';
import { SECTIONS } from '@/data/sections';
import TrapsCard from '@/components/TrapsCard';
import styles from './traps.module.css';

export default function TrapsPage() {
  const [sectionFilter, setSectionFilter] = useState<'all' | string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = sectionFilter === 'all'
    ? TRAP_PAIRS
    : TRAP_PAIRS.filter((t) => t.sectionId === sectionFilter);

  // Sections that have traps
  const activeSections = SECTIONS.filter((s) =>
    TRAP_PAIRS.some((t) => t.sectionId === s.id)
  );

  function toggle(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="page-shell">
      <div className="page-content">
        <h1 className="page-title">Traps &amp; Twins</h1>
        <p className="page-subtitle">
          The concepts that trick test-takers the most. Learn to tell them apart instantly.
        </p>

        <div className={styles.filterRow}>
          <button
            className={`${styles.chip} ${sectionFilter === 'all' ? styles.chipActive : ''}`}
            onClick={() => setSectionFilter('all')}
          >
            All ({TRAP_PAIRS.length})
          </button>
          {activeSections.map((s) => {
            const count = TRAP_PAIRS.filter((t) => t.sectionId === s.id).length;
            return (
              <button
                key={s.id}
                className={`${styles.chip} ${sectionFilter === s.id ? styles.chipActive : ''}`}
                onClick={() => setSectionFilter(s.id)}
              >
                {s.icon} {s.title} ({count})
              </button>
            );
          })}
        </div>

        <div className={styles.trapList}>
          {filtered.map((trap) => (
            <div key={trap.id} className={styles.trapItem}>
              {expandedId === trap.id ? (
                <TrapsCard trap={trap} />
              ) : (
                <button
                  className={styles.trapRow}
                  onClick={() => toggle(trap.id)}
                >
                  <div className={styles.trapMeta}>
                    <p className={styles.trapTitle}>{trap.title}</p>
                    <p className={styles.trapSub}>
                      {SECTIONS.find((s) => s.id === trap.sectionId)?.title} · {trap.questions.length} rapid-fire Qs
                    </p>
                  </div>
                  <span className={styles.trapChevron}>›</span>
                </button>
              )}
              {expandedId !== trap.id ? null : (
                <button className={styles.collapseBtn} onClick={() => setExpandedId(null)}>
                  ↑ Collapse
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
