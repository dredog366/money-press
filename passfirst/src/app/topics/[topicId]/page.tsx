'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp, useTopicProgress } from '@/store';
import { getTopicById } from '@/data/sections';
import { getMicroLessonByTopicId } from '@/data/microlessons';
import { getMnemonicsByTopic } from '@/data/mnemonics';
import { getQuestionsByTopic } from '@/data/questions';
import MnemonicCard from '@/components/MnemonicCard';
import QuestionCard from '@/components/QuestionCard';
import ReadinessBar from '@/components/ReadinessBar';
import type { RecallResult } from '@/types';
import styles from './topic-detail.module.css';

type Phase = 'lesson' | 'mnemonic' | 'recall' | 'practice' | 'done';

export default function TopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const router = useRouter();
  const { dispatch, updateTopicProgress, toggleFavorite, isFavorite } = useApp();

  const topicData = getTopicById(topicId);
  const microLesson = getMicroLessonByTopicId(topicId);
  const mnemonics = getMnemonicsByTopic(topicId);
  const questions = getQuestionsByTopic(topicId).slice(0, 3);
  const topicProgress = useTopicProgress(topicId);

  const [phase, setPhase] = useState<Phase>('lesson');
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [recallResult, setRecallResult] = useState<RecallResult | null>(null);

  if (!topicData || !microLesson) {
    return (
      <div className="page-shell">
        <div className="page-content">
          <p>Topic not found.</p>
          <button onClick={() => router.back()} className="btn-secondary" style={{ marginTop: 12 }}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const { topic, section } = topicData;

  function handleRecall(result: RecallResult) {
    setRecallResult(result);
    updateTopicProgress(topicId, result);
  }

  function handlePracticeAnswer(selectedIndex: number, correct: boolean) {
    dispatch({
      type: 'ADD_QUESTION_ATTEMPT',
      payload: {
        questionId: questions[practiceIndex].id,
        correct,
        selectedIndex,
        timestamp: new Date().toISOString(),
      },
    });
    setPracticeAnswered(true);
  }

  function nextPractice() {
    if (practiceIndex + 1 >= questions.length) {
      setPhase('done');
    } else {
      setPracticeIndex((i) => i + 1);
      setPracticeAnswered(false);
    }
  }

  const recallColors: Record<RecallResult, string> = {
    easy: 'var(--color-success)',
    medium: 'var(--color-primary)',
    hard: 'var(--color-warning)',
    missed: 'var(--color-danger)',
  };

  return (
    <div className="page-shell">
      <div className="page-content">

        {/* Top bar */}
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={() => router.back()}>← Back</button>
          <div className={styles.phaseIndicator}>
            {(['lesson', 'mnemonic', 'recall', 'practice'] as Phase[]).map((p) => (
              <div
                key={p}
                className={`${styles.phaseDot} ${phase === p ? styles.phaseActive : ['lesson','mnemonic','recall','practice','done'].indexOf(phase) > ['lesson','mnemonic','recall','practice'].indexOf(p) ? styles.phaseDone : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.sectionIcon}>{section.icon}</span>
          <div>
            <p className={styles.sectionName}>{section.title}</p>
            <h1 className={styles.topicTitle}>{topic.title}</h1>
          </div>
        </div>

        <div className={styles.readinessRow}>
          <ReadinessBar readiness={topicProgress.readiness} />
        </div>

        {/* ── PHASE: LESSON ── */}
        {phase === 'lesson' && (
          <div className={styles.phase}>
            <div className={styles.phaseLabel}>Learn</div>

            <div className={styles.lessonBlock}>
              <div className={styles.lessonSection}>
                <span className={styles.lessonIcon}>📖</span>
                <div>
                  <p className={styles.lessonHeading}>What it is</p>
                  <p className={styles.lessonText}>{microLesson.whatItIs}</p>
                </div>
              </div>
              <div className={styles.lessonSection}>
                <span className={styles.lessonIcon}>💡</span>
                <div>
                  <p className={styles.lessonHeading}>Why it matters</p>
                  <p className={styles.lessonText}>{microLesson.whyItMatters}</p>
                </div>
              </div>
              <div className={`${styles.lessonSection} ${styles.trapSection}`}>
                <span className={styles.lessonIcon}>⚠️</span>
                <div>
                  <p className={styles.lessonHeading}>Exam trap</p>
                  <p className={styles.lessonText}>{microLesson.examTrap}</p>
                </div>
              </div>
            </div>

            <div className={styles.examTip}>
              <span className={styles.tipLabel}>Danny&apos;s Exam Tip</span>
              <p>{topic.examTip}</p>
            </div>

            <button className="btn-primary" onClick={() => setPhase('mnemonic')}>
              Next: Mnemonic →
            </button>
          </div>
        )}

        {/* ── PHASE: MNEMONIC ── */}
        {phase === 'mnemonic' && (
          <div className={styles.phase}>
            <div className={styles.phaseLabel}>Hook it</div>

            {mnemonics.length > 0 ? (
              mnemonics.map((m) => (
                <MnemonicCard
                  key={m.id}
                  card={m}
                  isFavorite={isFavorite(m.id)}
                  onToggleFavorite={() => toggleFavorite(m.id)}
                />
              ))
            ) : (
              <div className={styles.noMnemonic}>
                <p className={styles.lessonText}><strong>Mnemonic: </strong>{microLesson.mnemonic}</p>
                <p className={styles.lessonText} style={{ marginTop: 8 }}><strong>Example: </strong>{microLesson.example}</p>
              </div>
            )}

            <button className="btn-primary" onClick={() => setPhase('recall')}>
              Next: Recall →
            </button>
          </div>
        )}

        {/* ── PHASE: RECALL ── */}
        {phase === 'recall' && (
          <div className={styles.phase}>
            <div className={styles.phaseLabel}>Recall</div>

            <div className={styles.recallCard}>
              <p className={styles.recallIntro}>Without looking back — how well do you know <strong>{topic.title}</strong>?</p>
              <div className={styles.recallPrompts}>
                {microLesson.recallPrompts.map((prompt, i) => (
                  <div key={i} className={styles.recallPromptItem}>
                    <span className={styles.recallNum}>{i + 1}</span>
                    <span>{prompt}</span>
                  </div>
                ))}
              </div>
            </div>

            {!recallResult ? (
              <div className={styles.recallButtons}>
                <p className={styles.recallCta}>Take a moment, then rate yourself:</p>
                {([['easy', '✓ Got it cold', 'var(--color-success-light)', 'var(--color-success)'],
                   ['medium', '~ Almost got it', 'var(--color-primary-light)', 'var(--color-primary)'],
                   ['hard', '✗ Struggled', 'var(--color-warning-light)', 'var(--color-warning)'],
                   ['missed', '💀 Blanked', 'var(--color-danger-light)', 'var(--color-danger)']] as const).map(([r, label, bg, color]) => (
                  <button
                    key={r}
                    className={styles.selfRateBtn}
                    style={{ background: bg, color }}
                    onClick={() => handleRecall(r as RecallResult)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : (
              <div className={styles.recallResult} style={{ borderColor: recallColors[recallResult] }}>
                <p style={{ color: recallColors[recallResult], fontWeight: 700 }}>
                  Logged as &ldquo;{recallResult}&rdquo;
                </p>
                <p className={styles.recallResultSub}>
                  {recallResult === 'easy' ? 'Next review in 4 days.' :
                   recallResult === 'medium' ? 'Next review in 2 days.' :
                   recallResult === 'hard' ? 'Review again tomorrow.' :
                   'Review again later today.'}
                </p>
                <button className="btn-primary" onClick={() => setPhase('practice')}>
                  {questions.length > 0 ? 'Next: Practice questions →' : 'Finish →'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── PHASE: PRACTICE ── */}
        {phase === 'practice' && questions.length > 0 && (
          <div className={styles.phase}>
            <div className={styles.phaseLabel}>Practice</div>

            <QuestionCard
              key={practiceIndex}
              question={questions[practiceIndex]}
              questionNumber={practiceIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handlePracticeAnswer}
            />

            {practiceAnswered && (
              <button className="btn-primary" onClick={nextPractice} style={{ marginTop: 12 }}>
                {practiceIndex + 1 < questions.length ? 'Next question →' : 'Finish →'}
              </button>
            )}
          </div>
        )}

        {/* ── PHASE: DONE ── */}
        {phase === 'done' && (
          <div className={styles.phase}>
            <div className={styles.doneCard}>
              <span className={styles.doneEmoji}>🎉</span>
              <h2 className={styles.doneTitle}>Topic complete!</h2>
              <p className={styles.doneSub}>You&apos;ve worked through <strong>{topic.title}</strong>. Keep the momentum going.</p>
              <div className={styles.doneReadiness}>
                <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 8 }}>Updated readiness:</p>
                <ReadinessBar readiness={topicProgress.readiness} />
              </div>
            </div>

            <div className={styles.doneActions}>
              <button className="btn-primary" onClick={() => router.push('/home')}>
                Back to home
              </button>
              <button className="btn-secondary" onClick={() => router.push('/topics')}>
                View all topics
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
