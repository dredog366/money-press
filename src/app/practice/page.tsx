'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/store';
import { QUESTIONS } from '@/data/questions';
import { TRAP_PAIRS } from '@/data/traps';
import { ALL_RECALL_PROMPTS } from '@/data/microlessons';
import { SECTIONS } from '@/data/sections';
import QuestionCard from '@/components/QuestionCard';
import TrapsCard from '@/components/TrapsCard';
import type { MissReason } from '@/types';
import styles from './practice.module.css';

type HubTab = 'questions' | 'traps' | 'lightning';
type QMode = 'select' | 'session' | 'results';
type SectionFilter = 'all' | string;

// ─── Lightning sub-component ─────────────────────────────────────────────────

const DRILL_COUNT = 10;
const SECONDS = 10;

function LightningPanel() {
  const [phase, setPhase] = useState<'idle' | 'drill' | 'results'>('idle');
  const [deck, setDeck] = useState<typeof ALL_RECALL_PROMPTS>([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SECONDS);
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
    setTimeLeft(SECONDS);
    setResults([]);
    setRevealed(false);
    setPhase('drill');
  }

  function advance(result: 'got' | 'blanked') {
    const next = [...results, result];
    setResults(next);
    if (next.length >= DRILL_COUNT) {
      setPhase('results');
    } else {
      setIndex((i) => i + 1);
      setTimeLeft(SECONDS);
      setRevealed(false);
    }
  }

  // Timer
  useMemo(() => {
    // handled via setInterval in useEffect — keep it simple here
  }, []);

  const current = deck[index];
  const gotCount = results.filter((r) => r === 'got').length;

  if (phase === 'idle') {
    return (
      <div className={styles.lightningIntro}>
        <div className={styles.lightningIcon}>⚡</div>
        <p className={styles.lightningDesc}>
          10 random recall prompts. {SECONDS}s each. Say the answer out loud, then grade yourself.
        </p>
        <button className="btn-primary" onClick={startDrill} style={{ width: '100%' }}>
          Start lightning drill ⚡
        </button>
        <Link href="/lightning" className={styles.lightningFullLink}>
          Open full lightning mode →
        </Link>
      </div>
    );
  }

  if (phase === 'drill' && current) {
    return (
      <div className={styles.drillWrap}>
        <div className={styles.drillTop}>
          <span className={styles.drillCount}>{index + 1}/{DRILL_COUNT}</span>
          <button className={styles.quitBtn} onClick={() => setPhase('idle')}>✕ Quit</button>
        </div>
        <div className={styles.topicTag}>{current.topicTitle}</div>
        <p className={styles.drillPrompt}>{current.prompt}</p>
        {!revealed ? (
          <button className={styles.revealBtn} onClick={() => setRevealed(true)}>Reveal answer</button>
        ) : (
          <div className={styles.gradeRow}>
            <button className={styles.gotBtn} onClick={() => advance('got')}>✓ Got it</button>
            <button className={styles.blankedBtn} onClick={() => advance('blanked')}>✗ Blanked</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.drillResults}>
      <div className={`${styles.drillScore} ${gotCount >= 8 ? styles.drillScoreHigh : gotCount >= 5 ? styles.drillScoreMid : styles.drillScoreLow}`}>
        <span className={styles.drillScoreNum}>{gotCount}/{DRILL_COUNT}</span>
        <span className={styles.drillScoreSub}>
          {gotCount >= 8 ? 'Excellent! 🔥' : gotCount >= 5 ? 'Solid work.' : 'Keep drilling.'}
        </span>
      </div>
      <div className={styles.drillActions}>
        <button className="btn-primary" onClick={startDrill} style={{ flex: 1 }}>New drill ⚡</button>
        <button className="btn-secondary" onClick={() => setPhase('idle')} style={{ flex: 1 }}>Done</button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PracticePage() {
  const { state, dispatch, allQuestions } = useApp();

  const [hubTab, setHubTab] = useState<HubTab>('questions');
  const [qMode, setQMode] = useState<QMode>('select');
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>('all');
  const [sessionSize, setSessionSize] = useState<10 | 20>(10);
  const [sessionQuestions, setSessionQuestions] = useState(QUESTIONS.slice(0, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState<{ correct: number; total: number; missReasons: MissReason[] }>({
    correct: 0, total: 0, missReasons: [],
  });
  const [answered, setAnswered] = useState(false);
  const [trapFilter, setTrapFilter] = useState<'all' | string>('all');

  const missedIds = useMemo(() => {
    const wrong = state.questionAttempts.filter((a) => !a.correct).map((a) => a.questionId);
    return new Set(wrong);
  }, [state.questionAttempts]);

  function startSession() {
    let pool = sectionFilter === 'all'
      ? allQuestions
      : allQuestions.filter((q) => q.sectionId === sectionFilter);

    pool = [...pool].sort((a, b) => {
      const aScore = missedIds.has(a.id) ? 0 : a.difficulty === 'hard' ? 1 : a.difficulty === 'medium' ? 2 : 3;
      const bScore = missedIds.has(b.id) ? 0 : b.difficulty === 'hard' ? 1 : b.difficulty === 'medium' ? 2 : 3;
      return aScore - bScore;
    });

    setSessionQuestions(pool.slice(0, sessionSize));
    setCurrentIndex(0);
    setSessionResults({ correct: 0, total: 0, missReasons: [] });
    setAnswered(false);
    setQMode('session');
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
      setQMode('results');
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
    }
  }

  const allAttempts = state.questionAttempts;
  const accuracy = allAttempts.length > 0
    ? Math.round((allAttempts.filter((a) => a.correct).length / allAttempts.length) * 100)
    : 0;

  const missReasonCounts: Record<MissReason, number> = {
    'forgot-rule': 0, 'mixed-concepts': 0, rushed: 0, 'tricky-wording': 0,
  };
  allAttempts.forEach((a) => {
    if (a.missReason) missReasonCounts[a.missReason]++;
  });
  const topMissReason = (Object.entries(missReasonCounts) as [MissReason, number][])
    .sort((a, b) => b[1] - a[1])[0];

  const filteredTraps = trapFilter === 'all'
    ? TRAP_PAIRS
    : TRAP_PAIRS.filter((t) => t.sectionId === trapFilter);
  const trapSections = SECTIONS.filter((s) => TRAP_PAIRS.some((t) => t.sectionId === s.id));

  return (
    <div className="page-shell">
      <div className="page-content">
        <h1 className="page-title">Practice</h1>

        {/* Hub tab bar */}
        <div className={styles.hubTabs}>
          {([
            { key: 'questions', label: 'Questions', icon: '❓' },
            { key: 'traps', label: 'Traps', icon: '⚔️' },
            { key: 'lightning', label: 'Lightning', icon: '⚡' },
          ] as { key: HubTab; label: string; icon: string }[]).map((t) => (
            <button
              key={t.key}
              className={`${styles.hubTab} ${hubTab === t.key ? styles.hubTabActive : ''}`}
              onClick={() => setHubTab(t.key)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── Questions tab ── */}
        {hubTab === 'questions' && (
          <>
            {qMode === 'select' && (
              <>
                <p className="page-subtitle">
                  {allQuestions.length} questions across 8 sections.
                  {allAttempts.length > 0 && ` ${allAttempts.length} answered total.`}
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
                        <span className={styles.statLabel}>Most missed:</span>
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
                      <p className={styles.reviewSub}>Missed questions appear first in your next session.</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {qMode === 'session' && (
              <>
                <div className={styles.sessionHeader}>
                  <button className={styles.quitBtn} onClick={() => setQMode('select')}>✕ Quit</button>
                  <span className={styles.sessionInfo}>{currentIndex + 1} / {sessionQuestions.length}</span>
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

            {qMode === 'results' && (
              <>
                <h2 className={styles.resultsTitle}>Session complete!</h2>
                <div className={styles.resultCircle} style={{
                  background: sessionResults.correct / sessionResults.total >= 0.7
                    ? 'var(--color-success-light)' : 'var(--color-warning-light)',
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
                    <p className={styles.missTitle}>Why you missed:</p>
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
                  <button className="btn-primary" onClick={startSession}>Another session →</button>
                  <button className="btn-secondary" onClick={() => setQMode('select')}>Change settings</button>
                </div>
              </>
            )}
          </>
        )}

        {/* ── Traps tab ── */}
        {hubTab === 'traps' && (
          <>
            <p className="page-subtitle">
              The concepts test-takers confuse most. Study the differences, then test yourself.
            </p>
            <div className={styles.chipRow} style={{ marginBottom: 16 }}>
              <button
                className={`${styles.chip} ${trapFilter === 'all' ? styles.chipActive : ''}`}
                onClick={() => setTrapFilter('all')}
              >
                All ({TRAP_PAIRS.length})
              </button>
              {trapSections.map((s) => (
                <button
                  key={s.id}
                  className={`${styles.chip} ${trapFilter === s.id ? styles.chipActive : ''}`}
                  onClick={() => setTrapFilter(s.id)}
                >
                  {s.icon} {s.title}
                </button>
              ))}
            </div>
            <div>
              {filteredTraps.map((trap) => (
                <TrapsCard key={trap.id} trap={trap} />
              ))}
            </div>
            <Link href="/traps" className={styles.viewAllLink}>
              View full Traps page →
            </Link>
          </>
        )}

        {/* ── Lightning tab ── */}
        {hubTab === 'lightning' && <LightningPanel />}
      </div>
    </div>
  );
}
