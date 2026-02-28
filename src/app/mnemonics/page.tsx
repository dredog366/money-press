'use client';

import { useState } from 'react';
import { useApp } from '@/store';
import { MNEMONICS } from '@/data/mnemonics';
import { SECTIONS } from '@/data/sections';
import MnemonicCard from '@/components/MnemonicCard';
import styles from './mnemonics.module.css';

type Filter = 'all' | 'favorites' | string; // string = sectionId

export default function MnemonicsPage() {
  const { state, toggleFavorite, isFavorite, updateTopicProgress } = useApp();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const filtered = MNEMONICS.filter((m) => {
    if (filter === 'favorites' && !state.favoriteMnemonics.includes(m.id)) return false;
    if (filter !== 'all' && filter !== 'favorites' && m.sectionId !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return m.title.toLowerCase().includes(q) || m.content.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="page-shell">
      <div className="page-content">
        <h1 className="page-title">Mnemonic Library</h1>
        <p className="page-subtitle">{MNEMONICS.length} memory hooks — your secret weapon for the exam.</p>

        {/* Search */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search mnemonics..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        {/* Filter chips */}
        <div className={styles.filterRow}>
          {[
            { value: 'all', label: `All (${MNEMONICS.length})` },
            { value: 'favorites', label: `★ Saved (${state.favoriteMnemonics.length})` },
            ...SECTIONS.map((s) => ({
              value: s.id,
              label: `${s.icon} ${s.title}`,
            })),
          ].map((f) => (
            <button
              key={f.value}
              className={`${styles.chip} ${filter === f.value ? styles.chipActive : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🧠</span>
            <p>No mnemonics match that filter.</p>
          </div>
        ) : (
          <div className={styles.cardList}>
            {filtered.map((card) => (
              <MnemonicCard
                key={card.id}
                card={card}
                isFavorite={isFavorite(card.id)}
                onToggleFavorite={() => toggleFavorite(card.id)}
                onRecall={(result) => updateTopicProgress(card.topicId, result)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
