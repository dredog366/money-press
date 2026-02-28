'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/store';
import type { USState, UserProfile } from '@/types';
import { QUESTIONS, DIAGNOSTIC_QUESTION_IDS } from '@/data/questions';
import QuestionCard from '@/components/QuestionCard';
import styles from './onboarding.module.css';

type Step = 'welcome' | 'state' | 'schedule' | 'diagnostic' | 'results';

const US_STATES: { value: USState; label: string; flag: string }[] = [
  { value: 'national', label: 'National Only', flag: '🇺🇸' },
  { value: 'california', label: 'California', flag: '🌴' },
  { value: 'texas', label: 'Texas', flag: '⭐' },
  { value: 'florida', label: 'Florida', flag: '🌊' },
  { value: 'new-york', label: 'New York', flag: '🗽' },
];

const DAILY_OPTIONS: { value: 10 | 20 | 40; label: string; sub: string }[] = [
  { value: 10, label: '10 min / day', sub: 'Light — just stay sharp' },
  { value: 20, label: '20 min / day', sub: 'Balanced — ideal for most' },
  { value: 40, label: '40 min / day', sub: 'Intensive — fast track' },
];

const DIAGNOSTIC_IDS = DIAGNOSTIC_QUESTION_IDS.slice(0, 10);
const DIAGNOSTIC_QUESTIONS = QUESTIONS.filter((q) => DIAGNOSTIC_IDS.includes(q.id));

export default function OnboardingPage() {
  const { dispatch } = useApp();
  const router = useRouter();

  const [step, setStep] = useState<Step>('welcome');
  const [selectedState, setSelectedState] = useState<USState>('national');
  const [examDate, setExamDate] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState<10 | 20 | 40>(20);
  const [diagIndex, setDiagIndex] = useState(0);
  const [diagCorrect, setDiagCorrect] = useState(0);
  const [diagAnswered, setDiagAnswered] = useState(false);

  function handleDiagAnswer(_: number, correct: boolean) {
    if (correct) setDiagCorrect((c) => c + 1);
    setDiagAnswered(true);
  }

  function nextDiagQuestion() {
    if (diagIndex + 1 >= DIAGNOSTIC_QUESTIONS.length) {
      setStep('results');
    } else {
      setDiagIndex((i) => i + 1);
      setDiagAnswered(false);
    }
  }

  function finish() {
    const profile: UserProfile = {
      state: selectedState,
      examDate: examDate || undefined,
      dailyMinutes,
      onboardingComplete: true,
      diagnosticComplete: true,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'SET_USER', payload: profile });
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    dispatch({ type: 'COMPLETE_DIAGNOSTIC' });
    router.push('/home');
  }

  const score = Math.round((diagCorrect / DIAGNOSTIC_QUESTIONS.length) * 100);
  const scoreMsg =
    score >= 80 ? 'Strong foundation! Focus on weak spots.' :
    score >= 50 ? 'Good start — lots to lock in.' :
    'Perfect — this app is built for exactly where you are.';

  return (
    <div className={styles.shell}>
      <div className={styles.content}>

        {step === 'welcome' && (
          <div className={styles.panel}>
            <div className={styles.logo}>🏠</div>
            <h1 className={styles.heading}>PassFirst</h1>
            <p className={styles.sub}>
              Real estate exam prep built for people who don&apos;t learn from textbooks.
              Mnemonics, micro-lessons, spaced repetition — your way.
            </p>
            <div className={styles.featureList}>
              {['🧠 Memory-first mnemonics', '⚡ 10–40 min daily sessions', '📈 Spaced repetition that adapts', '💬 Danny\'s personal exam notes'].map((f) => (
                <div key={f} className={styles.feature}>{f}</div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setStep('state')}>
              Let&apos;s get started →
            </button>
          </div>
        )}

        {step === 'state' && (
          <div className={styles.panel}>
            <p className={styles.stepLabel}>Step 1 of 3</p>
            <h2 className={styles.heading}>Which exam are you taking?</h2>
            <p className={styles.sub}>All content covers the national portion. State-specific content for select states.</p>
            <div className={styles.stateGrid}>
              {US_STATES.map((s) => (
                <button
                  key={s.value}
                  className={`${styles.stateBtn} ${selectedState === s.value ? styles.selected : ''}`}
                  onClick={() => setSelectedState(s.value)}
                >
                  <span className={styles.stateFlag}>{s.flag}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setStep('schedule')}>
              Next →
            </button>
          </div>
        )}

        {step === 'schedule' && (
          <div className={styles.panel}>
            <p className={styles.stepLabel}>Step 2 of 3</p>
            <h2 className={styles.heading}>Set your study schedule</h2>

            <label className={styles.fieldLabel}>Exam date (optional)</label>
            <input
              type="date"
              className={styles.dateInput}
              value={examDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setExamDate(e.target.value)}
            />
            <p className={styles.fieldHint}>Used to pace your study plan. Skip if unknown.</p>

            <label className={styles.fieldLabel} style={{ marginTop: 20 }}>Daily goal</label>
            <div className={styles.dailyGrid}>
              {DAILY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`${styles.dailyBtn} ${dailyMinutes === opt.value ? styles.selected : ''}`}
                  onClick={() => setDailyMinutes(opt.value)}
                >
                  <span className={styles.dailyLabel}>{opt.label}</span>
                  <span className={styles.dailySub}>{opt.sub}</span>
                </button>
              ))}
            </div>

            <button className="btn-primary" onClick={() => setStep('diagnostic')}>
              Take diagnostic quiz →
            </button>
          </div>
        )}

        {step === 'diagnostic' && (
          <div className={styles.panel}>
            <p className={styles.stepLabel}>Step 3 of 3 — Diagnostic</p>
            <h2 className={styles.heading}>Quick baseline quiz</h2>
            <p className={styles.sub}>10 questions to find your starting point. No pressure — we need to know what to focus on.</p>

            <div className={styles.diagProgress}>
              {DIAGNOSTIC_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`${styles.diagDot} ${i < diagIndex ? styles.diagDone : i === diagIndex ? styles.diagActive : ''}`}
                />
              ))}
            </div>

            <QuestionCard
              key={diagIndex}
              question={DIAGNOSTIC_QUESTIONS[diagIndex]}
              questionNumber={diagIndex + 1}
              totalQuestions={DIAGNOSTIC_QUESTIONS.length}
              onAnswer={handleDiagAnswer}
            />

            {diagAnswered && (
              <button className="btn-primary" onClick={nextDiagQuestion} style={{ marginTop: 12 }}>
                {diagIndex + 1 < DIAGNOSTIC_QUESTIONS.length ? 'Next question →' : 'See my results →'}
              </button>
            )}
          </div>
        )}

        {step === 'results' && (
          <div className={styles.panel}>
            <div className={styles.scoreCircle} style={{ background: score >= 70 ? 'var(--color-success-light)' : score >= 40 ? 'var(--color-primary-light)' : 'var(--color-warning-light)' }}>
              <span className={styles.scoreNum}>{score}%</span>
              <span className={styles.scoreLabel}>{diagCorrect}/{DIAGNOSTIC_QUESTIONS.length} correct</span>
            </div>
            <h2 className={styles.heading}>Baseline set!</h2>
            <p className={styles.sub}>{scoreMsg}</p>

            <div className={styles.readyBox}>
              <p>Your personalized study plan is ready. Sessions are {dailyMinutes} minutes, adapting as you go.</p>
            </div>

            <button className="btn-primary" onClick={finish}>
              Start studying →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
