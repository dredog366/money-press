'use client';

import { useState } from 'react';
import type { Question, MissReason } from '@/types';
import styles from './QuestionCard.module.css';

interface Props {
  question: Question;
  questionNumber?: number;
  totalQuestions?: number;
  onAnswer: (selectedIndex: number, correct: boolean, missReason?: MissReason) => void;
}

const MISS_REASONS: { value: MissReason; label: string }[] = [
  { value: 'forgot-rule', label: 'I forgot the rule' },
  { value: 'mixed-concepts', label: 'I mixed up two concepts' },
  { value: 'rushed', label: 'I rushed / misread it' },
  { value: 'tricky-wording', label: 'The wording tricked me' },
];

export default function QuestionCard({ question, questionNumber, totalQuestions, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [missReason, setMissReason] = useState<MissReason | null>(null);

  const answered = selected !== null;
  const correct = answered && selected === question.correctIndex;

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    setShowExplanation(true);
    if (i === question.correctIndex) {
      onAnswer(i, true);
    }
  }

  function handleMissReason(reason: MissReason) {
    setMissReason(reason);
    onAnswer(selected!, false, reason);
  }

  return (
    <div className={styles.card}>
      {questionNumber && totalQuestions && (
        <div className={styles.progress}>
          <span className={styles.progressText}>
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className={styles.difficulty}>
        <span className={`${styles.difficultyBadge} ${styles[question.difficulty]}`}>
          {question.difficulty}
        </span>
      </div>

      <p className={styles.questionText}>{question.text}</p>

      <div className={styles.options}>
        {question.options.map((option, i) => {
          let optClass = styles.option;
          if (answered) {
            if (i === question.correctIndex) optClass += ` ${styles.correct}`;
            else if (i === selected) optClass += ` ${styles.wrong}`;
          } else {
            optClass += ` ${styles.unanswered}`;
          }
          return (
            <button key={i} className={optClass} onClick={() => handleSelect(i)} disabled={answered}>
              <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
              <span className={styles.optionText}>{option}</span>
              {answered && i === question.correctIndex && <span className={styles.mark}>✓</span>}
              {answered && i === selected && i !== question.correctIndex && <span className={styles.mark}>✗</span>}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className={`${styles.explanation} ${correct ? styles.explCorrect : styles.explWrong}`}>
          <div className={styles.explHeader}>
            {correct ? '✓ Correct!' : '✗ Not quite'}
          </div>
          <p className={styles.explText}>{question.explanation}</p>
          {question.trapNote && (
            <div className={styles.trapNote}>
              <span className={styles.trapLabel}>Exam Trap</span>
              <p>{question.trapNote}</p>
            </div>
          )}

          {!correct && !missReason && (
            <div className={styles.missSection}>
              <p className={styles.missPrompt}>Why did you miss it?</p>
              <div className={styles.missButtons}>
                {MISS_REASONS.map((r) => (
                  <button key={r.value} className={styles.missBtn} onClick={() => handleMissReason(r.value)}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!correct && missReason && (
            <p className={styles.missConfirm}>Noted — we&apos;ll help you nail this concept.</p>
          )}
        </div>
      )}
    </div>
  );
}
