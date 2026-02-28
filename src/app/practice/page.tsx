'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/store';
import { QUESTIONS } from '@/data/questions';
import { SECTIONS } from '@/data/sections';
import QuestionCard from '@/components/QuestionCard';
import type { MissReason } from '@/types';
import styles from './practice.module.css';

type Mode = 'select' | 'session' | 'results';
type SectionFilter = 'all' | string;

export default function PracticePage() {
  const { state, dispatch } = useApp();

  const [mode, setMode] = useState<Mode>('select');
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>('all');
  const [sessionSize, setSessionSize] = useState<10 | 20>(10);
  const [sessionQuestions, setSessionQuestions] = useState(QUESTIONS.slice(0, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState<{ correct: number; total: number; missReasons: MissReason[] }>({
    correct: 0, total: 0, missReasons: [],
  });
  const [answered, setAnswered] = useState(false);

  // Prioritise questions user has missed before
  const missedIds = useMemo(() => {
    const wrong = state.questionAttempts.filter((a) => !a.correct).map((a) => a.questionId);
    return new Set(wrong);
  }, [state.questionAttempts]);

  function startSession() {
    let pool = sectionFilter === 'all'
      ? QUESTIONS
      : QUESTIONS.filter((q) => q.sectionId === sectionFilter);

    // Sort: missed first, then by difficulty
    pool = [...pool].sort((a, b) => {
      const aScore = missedIds.has(a.id) ? 0 : a.difficulty === 'hard' ? 1 : a.difficulty === 'medium' ? 2 : 3;
      const bScore = missedIds.has(b.id) ? 0 : b.difficulty === 'hard' ? 1 : b.difficulty === 'medium' ? 2 : 3;
      return aScore - bScore;
    });

    setSessionQuestions(pool.slice(0, sessionSize));
    setCurrentIndex(0);
    setSessionResults({ correct: 0, total: 0, missReasons: [] });
    setAnswered(false);
    setMode('session');
  }

  function handleAnswer(selectedIndex: number, correct: boolean, missReason?: MissReason) {
    dispatch({
      type: 'ADD_QUESTION_ATTEMPT',
      payload: {
        questionId: sessionQuestions[currentIndex].id,
        correct,
        selectedIndex,
        missReason,
        timestamp: new Date().toISOString(),
      },
    });
    setSessionResults((r) => ({
      correct: r.correct + (correct ? 1 : 0),
      total: r.total + 1,
      missReasons: missReason ? [...r.missReasons, missReason] : r.missReasons,
    }));
    setAnswered(true);
  }

  function nextQuestion() {
    if (currentIndex + 1 >= sessionQuestions.length) {
      setMode('results');
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
    }
  }

  // Global accuracy
  const allAttempts = state.questionAttempts;
  const accuracy = allAttempts.length > 0
    ? Math.round((allAttempts.filter((a) => a.correct).length / allAttempts.length) * 100)
    : 0;

  // Miss reason breakdown
  const missReasonCounts: Record<MissReason, number> = {
    'forgot-rule': 0, 'mixed-concepts': 0, rushed: 0, 'tricky-wording': 0,
  };
  allAttempts.forEach((a) => {
    if (a.missReason) missReasonCounts[a.missReason]++;
  });

  const topMissReason = (Object.entries(missReasonCounts) as [MissReason, number][])
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="page-shell">
      <div className="page-content">

        {mode === 'select' && (
          <>
            <h1 className="page-title">Practice Questions</h1>
            <p className="page-subtitle">
              {QUESTIONS.length} questions across 8 sections.
              {allAttempts.length > 0 && ` You've answered ${allAttempts.length} total.`}
            </p>

            {allAttempts.length > 0 && (
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>{accuracy}%</span>
                  <span className={styles.statLabel}>accuracy</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>{allAttempts.length}</span>
                  <span className={styles.statLabel}>answered</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>{missedIds.size}</span>
                  <span className={styles.statLabel}>to review</span>
                </div>
                {topMissReason && topMissReason[1] > 0 && (
                  <div className={`${styles.statBox} ${styles.statWide}`}>
                    <span className={styles.statLabel}>Most missed because:</span>
                    <span className={styles.statHighlight}>{topMissReason[0].replace(/-/g, ' ')}</span>
                  </div>
                )}
              </div>
            )}

            <div className={styles.configCard}>
              <div className={styles.configSection}>
                <p className={styles.configLabel}>Filter by section</p>
                <div className={styles.chipRow}>
                  <button
                    className={`${styles.chip} ${sectionFilter === 'all' ? styles.chipActive : ''}`}
                    onClick={() => setSectionFilter('all')}
                  >
                    All sections
                  </button>
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      className={`${styles.chip} ${sectionFilter === s.id ? styles.chipActive : ''}`}
                      onClick={() => setSectionFilter(s.id)}
                    >
                      {s.icon} {s.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.configSection}>
                <p className={styles.configLabel}>Session length</p>
                <div className={styles.sizeRow}>
                  {([10, 20] as const).map((n) => (
                    <button
                      key={n}
                      className={`${styles.sizeBtn} ${sessionSize === n ? styles.sizeBtnActive : ''}`}
                      onClick={() => setSessionSize(n)}
                    >
                      {n} questions
                    </button>
                  ))}
                </div>
              </div>

              <button className="btn-primary" onClick={startSession}>
                Start practice →
              </button>
            </div>

            {missedIds.size > 0 && (
              <div className={styles.reviewBanner}>
                <span>🎯</span>
                <div>
                  <p className={styles.reviewTitle}>{missedIds.size} questions to review</p>
                  <p className={styles.reviewSub}>Questions you&apos;ve missed will appear first in your next session.</p>
                </div>
              </div>
            )}
          </>
        )}

        {mode === 'session' && (
          <>
            <div className={styles.sessionHeader}>
              <button className={styles.quitBtn} onClick={() => setMode('select')}>✕ Quit</button>
              <span className={styles.sessionInfo}>
                {currentIndex + 1} / {sessionQuestions.length}
              </span>
            </div>

            <QuestionCard
              key={currentIndex}
              question={sessionQuestions[currentIndex]}
              questionNumber={currentIndex + 1}
              totalQuestions={sessionQuestions.length}
              onAnswer={handleAnswer}
            />

            {answered && (
              <button className="btn-primary" onClick={nextQuestion} style={{ marginTop: 12 }}>
                {currentIndex + 1 < sessionQuestions.length ? 'Next question →' : 'See results →'}
              </button>
            )}
          </>
        )}

        {mode === 'results' && (
          <>
            <h1 className="page-title">Session complete!</h1>

            <div className={styles.resultCircle} style={{
              background: sessionResults.correct / sessionResults.total >= 0.7
                ? 'var(--color-success-light)' : 'var(--color-warning-light)'
            }}>
              <span className={styles.resultScore}>
                {Math.round((sessionResults.correct / sessionResults.total) * 100)}%
              </span>
              <span className={styles.resultSub}>
                {sessionResults.correct}/{sessionResults.total} correct
              </span>
            </div>

            {sessionResults.missReasons.length > 0 && (
              <div className={styles.missBreakdown}>
                <p className={styles.missTitle}>Why you missed questions this session:</p>
                {(Object.entries(
                  sessionResults.missReasons.reduce((acc, r) => ({ ...acc, [r]: (acc[r] ?? 0) + 1 }), {} as Record<string, number>)
                ) as [string, number][]).sort((a, b) => b[1] - a[1]).map(([reason, count]) => (
                  <div key={reason} className={styles.missItem}>
                    <span className={styles.missReason}>{reason.replace(/-/g, ' ')}</span>
                    <span className={styles.missCount}>{count}×</span>
                  </div>
                ))}
              </div>
            )}

            <div className={styles.resultActions}>
              <button className="btn-primary" onClick={startSession}>
                Another session →
              </button>
              <button className="btn-secondary" onClick={() => setMode('select')}>
                Change settings
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
