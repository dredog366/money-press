'use client';

import { useState } from 'react';
import type { MnemonicCard as MnemonicCardType, RecallResult } from '@/types';
import styles from './MnemonicCard.module.css';

interface Props {
  card: MnemonicCardType;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRecall?: (result: RecallResult) => void;
  compact?: boolean;
}

export default function MnemonicCard({ card, isFavorite, onToggleFavorite, onRecall, compact }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <span className={styles.icon}>{card.icon}</span>
        <div className={styles.titleGroup}>
          <span className={styles.type}>{card.type}</span>
          <h3 className={styles.title}>{card.title}</h3>
        </div>
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favorited : ''}`}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className={styles.mnemonic}>{card.content}</div>

      {card.expansion && (
        <ul className={styles.expansion}>
          {card.expansion.map((line, i) => (
            <li key={i} className={styles.expansionItem}>
              <span className={styles.letter}>{line.split(' — ')[0]}</span>
              <span>{line.split(' — ').slice(1).join(' — ')}</span>
            </li>
          ))}
        </ul>
      )}

      {!compact && (
        <>
          <div className={styles.dannyNote}>
            <span className={styles.dannyLabel}>Danny&apos;s Note</span>
            <p>{card.dannyNote}</p>
          </div>

          {onRecall && (
            <div className={styles.recallSection}>
              <button className={styles.revealBtn} onClick={() => setRevealed((r) => !r)}>
                {revealed ? 'Hide recall' : 'Test yourself'}
              </button>
              {revealed && (
                <div className={styles.recallButtons}>
                  <p className={styles.recallPrompt}>How well do you know this?</p>
                  {(['easy', 'medium', 'hard', 'missed'] as RecallResult[]).map((r) => (
                    <button
                      key={r}
                      className={`${styles.recallBtn} ${styles[r]}`}
                      onClick={() => { onRecall(r); setRevealed(false); }}
                    >
                      {r === 'easy' ? '✓ Got it' : r === 'medium' ? '~ Almost' : r === 'hard' ? '✗ Struggled' : '💀 Missed it'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
