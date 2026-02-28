'use client';

import { useState, useEffect, useCallback } from 'react';
import { ALL_RECALL_PROMPTS } from '@/data/microlessons';
import styles from './lightning.module.css';

type Phase = 'intro' | 'drill' | 'results';

const DRILL_COUNT = 10;
const SECONDS_PER_PROMPT = 10;

export default function LightningPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [deck, setDeck] = useState<typeof ALL_RECALL_PROMPTS>([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_PROMPT);
  const [results, setResults] = useState<Array<'got' | 'blanked'>>([]);
  const [revealed, setRevealed] = useState(false);

  function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startDrill() {
    setDeck(shuffle(ALL_RECALL_PROMPTS).slice(0, DRILL_COUNT));
    setIndex(0);
    setTimeLeft(SECONDS_PER_PROMPT);
    setResults([]);
    setRevealed(false);
    setPhase('drill');
  }

  const advance = useCallback((result: 'got' | 'blanked') => {
    setResults((prev) => {
      const next = [...prev, result];
      if (next.length >= DRILL_COUNT) {
        setPhase('results');
      }
      return next;
    });
    setIndex((i) => i + 1);
    setTimeLeft(SECONDS_PER_PROMPT);
    setRevealed(false);
  }, []);

  useEffect(() => {
    if (phase !== 'drill') return;
    if (revealed) return;

    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setRevealed(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [phase, index, revealed]);

  const gotCount = results.filter((r) => r === 'got').length;
  const current = deck[index];

  return (
    <div className="page-shell">
      <div className="page-content">

        {phase === 'intro' && (
          <div className={styles.introSection}>
            <div className={styles.introIcon}>⚡</div>
            <h1 className="page-title">Lightning Recall</h1>
            <p className={styles.introText}>
              10 rapid-fire prompts. {SECONDS_PER_PROMPT} seconds each.
              Say the answer out loud, then grade yourself honestly.
            </p>
            <div className={styles.introBullets}>
              <div className={styles.introBullet}>
                <span className={styles.bulletIcon}>🎯</span>
                <span>Covers all 24 exam topics</span>
              </div>
              <div className={styles.introBullet}>
                <span className={styles.bulletIcon}>⏱️</span>
                <span>Under 2 minutes per session</span>
              </div>
              <div className={styles.introBullet}>
                <span className={styles.bulletIcon}>🧠</span>
                <span>Spaced repetition proven technique</span>
              </div>
            </div>
            <button className="btn-primary" onClick={startDrill} style={{ width: '100%' }}>
              Start lightning drill ⚡
            </button>
          </div>
        )}

        {phase === 'drill' && current && (
          <div className={styles.drillSection}>
            <div className={styles.drillHeader}>
              <span className={styles.drillCount}>{index + 1} / {DRILL_COUNT}</span>
              <button className={styles.quitBtn} onClick={() => setPhase('intro')}>✕</button>
            </div>

            <div className={styles.timerRing}>
              <svg viewBox="0 0 64 64" className={styles.timerSvg}>
                <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-bg)" strokeWidth="6" />
                <circle
                  cx="32" cy="32" r="28"
                  fill="none"
                  stroke={timeLeft > 5 ? 'var(--color-primary)' : 'var(--color-danger)'}
                  strokeWidth="6"
                  strokeDasharray={`${(timeLeft / SECONDS_PER_PROMPT) * 175.9} 175.9`}
                  strokeLinecap="round"
                  transform="rotate(-90 32 32)"
                  style={{ transition: 'stroke-dasharray 1s linear, stroke 0.3s' }}
                />
              </svg>
              <span className={styles.timerNum} style={{ color: timeLeft <= 3 ? 'var(--color-danger)' : 'var(--color-text)' }}>
                {timeLeft}
              </span>
            </div>

            <div className={styles.topicTag}>{current.topicTitle}</div>

            <p className={styles.prompt}>{current.prompt}</p>

            {!revealed ? (
              <button className={styles.revealBtn} onClick={() => setRevealed(true)}>
                Reveal answer
              </button>
            ) : (
              <div className={styles.gradeRow}>
                <button className={styles.gotBtn} onClick={() => advance('got')}>
                  ✓ Got it
                </button>
                <button className={styles.blankedBtn} onClick={() => advance('blanked')}>
                  ✗ Blanked
                </button>
              </div>
            )}
          </div>
        )}

        {phase === 'results' && (
          <div className={styles.resultsSection}>
            <h1 className="page-title">Session done!</h1>

            <div className={`${styles.scoreCircle} ${gotCount >= 8 ? styles.scoreHigh : gotCount >= 5 ? styles.scoreMid : styles.scoreLow}`}>
              <span className={styles.scoreNum}>{gotCount}/{DRILL_COUNT}</span>
              <span className={styles.scoreSub}>
                {gotCount >= 8 ? 'Excellent recall! 🔥' :
                 gotCount >= 5 ? 'Solid — keep drilling!' :
                 'Keep going — it sticks with reps.'}
              </span>
            </div>

            <div className={styles.resultsList}>
              {results.map((r, i) => (
                <div key={i} className={`${styles.resultItem} ${r === 'got' ? styles.resultGot : styles.resultBlanked}`}>
                  <span className={styles.resultIcon}>{r === 'got' ? '✓' : '✗'}</span>
                  <span className={styles.resultPrompt}>{deck[i]?.prompt}</span>
                </div>
              ))}
            </div>

            <div className={styles.resultActions}>
              <button className="btn-primary" onClick={startDrill} style={{ flex: 1 }}>
                New drill ⚡
              </button>
              <button className="btn-secondary" onClick={() => setPhase('intro')} style={{ flex: 1 }}>
                Back
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
