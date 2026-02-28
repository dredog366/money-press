'use client';

import { useState } from 'react';
import type { TrapPair } from '@/types';
import styles from './TrapsCard.module.css';

interface Props {
  trap: TrapPair;
}

type Phase = 'compare' | 'quiz' | 'done';

export default function TrapsCard({ trap }: Props) {
  const [phase, setPhase] = useState<Phase>('compare');
  const [quizIndex, setQuizIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<Array<'A' | 'B' | 'C'>>([]);

  const concepts = [trap.conceptA, trap.conceptB, ...(trap.conceptC ? [trap.conceptC] : [])];
  const q = trap.questions[quizIndex];

  function startQuiz() {
    setPhase('quiz');
    setQuizIndex(0);
    setRevealed(false);
    setCorrectCount(0);
    setAnswers([]);
  }

  function handleAnswer(ans: 'A' | 'B' | 'C') {
    setAnswers((prev) => [...prev, ans]);
    setRevealed(true);
  }

  function nextQuestion() {
    if (quizIndex + 1 >= trap.questions.length) {
      setPhase('done');
    } else {
      setQuizIndex((i) => i + 1);
      setRevealed(false);
    }
    if (answers[answers.length] === q.answer || (!revealed && answers.length < trap.questions.length)) {
      // count on next render
    }
  }

  function reset() {
    setPhase('compare');
    setQuizIndex(0);
    setRevealed(false);
    setCorrectCount(0);
    setAnswers([]);
  }

  // Calculate correct on done
  const totalCorrect = answers.filter((a, i) => a === trap.questions[i]?.answer).length;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{trap.title}</span>
        {phase === 'compare' && (
          <button className={styles.quizBtn} onClick={startQuiz}>
            Quiz me →
          </button>
        )}
        {phase !== 'compare' && (
          <button className={styles.resetBtn} onClick={reset}>
            ← Back
          </button>
        )}
      </div>

      {phase === 'compare' && (
        <>
          <div className={styles.conceptGrid} style={{ gridTemplateColumns: `repeat(${concepts.length}, 1fr)` }}>
            {concepts.map((c, i) => (
              <div key={c.name} className={`${styles.concept} ${i === 0 ? styles.conceptA : i === 1 ? styles.conceptB : styles.conceptC}`}>
                <p className={styles.conceptName}>{c.name}</p>
                <p className={styles.conceptDesc}>{c.description}</p>
                <div className={styles.keyFact}>
                  <span className={styles.keyFactLabel}>Key fact</span>
                  <p className={styles.keyFactText}>{c.keyFact}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.mnemonicBox}>
            <span className={styles.mnemonicLabel}>🧠 Mnemonic</span>
            <p className={styles.mnemonicText}>{trap.mnemonic}</p>
          </div>

          <div className={styles.dannyNote}>
            <span className={styles.dannyLabel}>Danny says:</span>
            <p className={styles.dannyText}>{trap.dannyNote}</p>
          </div>
        </>
      )}

      {phase === 'quiz' && (
        <div className={styles.quizSection}>
          <div className={styles.quizProgress}>
            {trap.questions.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i < quizIndex ? (answers[i] === trap.questions[i].answer ? styles.dotCorrect : styles.dotWrong) : i === quizIndex ? styles.dotCurrent : ''}`}
              />
            ))}
          </div>

          <p className={styles.quizQuestion}>{q.text}</p>
          <div className={styles.quizOptions}>
            {(['A', 'B', 'C'] as const).map((opt) => {
              const isSelected = revealed && answers[answers.length - 1] === opt;
              const isCorrect = opt === q.answer;
              let cls = styles.quizOpt;
              if (revealed) {
                if (isCorrect) cls = `${styles.quizOpt} ${styles.quizOptCorrect}`;
                else if (isSelected) cls = `${styles.quizOpt} ${styles.quizOptWrong}`;
              }
              return (
                <button
                  key={opt}
                  className={cls}
                  onClick={() => !revealed && handleAnswer(opt)}
                  disabled={revealed}
                >
                  <span className={styles.optLabel}>{opt}</span>
                  {opt === 'A' ? trap.conceptA.name : opt === 'B' ? trap.conceptB.name : trap.conceptC?.name ?? '—'}
                </button>
              );
            })}
          </div>

          {revealed && (
            <div className={styles.quizReveal}>
              <p className={styles.revealText}>{q.explanation}</p>
              <button className={styles.nextBtn} onClick={nextQuestion}>
                {quizIndex + 1 < trap.questions.length ? 'Next →' : 'See results →'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className={styles.doneSection}>
          <div className={`${styles.doneScore} ${totalCorrect === trap.questions.length ? styles.doneScorePerfect : totalCorrect >= 2 ? styles.doneScoreGood : styles.doneScoreMiss}`}>
            <span className={styles.doneNum}>{totalCorrect}/{trap.questions.length}</span>
            <span className={styles.doneSub}>
              {totalCorrect === trap.questions.length ? 'Perfect — you know this trap!' :
               totalCorrect >= 2 ? 'Good — review the ones you missed.' :
               'Study the concept again, then retry.'}
            </span>
          </div>
          <div className={styles.doneActions}>
            <button className={styles.retryBtn} onClick={startQuiz}>Retry quiz</button>
            <button className={styles.reviewBtn} onClick={reset}>Review concepts</button>
          </div>
        </div>
      )}
    </div>
  );
}
