'use client';

import { useState } from 'react';
import { useApp } from '@/store';
import { SECTIONS, ALL_TOPICS } from '@/data/sections';
import type { Question, MnemonicCard, MnemonicType } from '@/types';
import styles from './admin.module.css';

type Tab = 'questions' | 'mnemonics';

export default function AdminPage() {
  const { state, dispatch } = useApp();
  const [tab, setTab] = useState<Tab>('questions');

  // ── Question form state ────────────────────────────────────────────────────
  const [qSectionId, setQSectionId] = useState('');
  const [qTopicId, setQTopicId] = useState('');
  const [qText, setQText] = useState('');
  const [qOptions, setQOptions] = useState(['', '', '', '']);
  const [qCorrect, setQCorrect] = useState(0);
  const [qExplanation, setQExplanation] = useState('');
  const [qTrapNote, setQTrapNote] = useState('');
  const [qDifficulty, setQDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [qError, setQError] = useState('');
  const [qSuccess, setQSuccess] = useState(false);

  // ── Mnemonic form state ────────────────────────────────────────────────────
  const [mSectionId, setMSectionId] = useState('');
  const [mTopicId, setMTopicId] = useState('');
  const [mTitle, setMTitle] = useState('');
  const [mType, setMType] = useState<MnemonicType>('acronym');
  const [mContent, setMContent] = useState('');
  const [mExpansion, setMExpansion] = useState('');
  const [mDannyNote, setMDannyNote] = useState('');
  const [mIcon, setMIcon] = useState('🧠');
  const [mError, setMError] = useState('');
  const [mSuccess, setMSuccess] = useState(false);

  const topicsForSection = (sectionId: string) =>
    ALL_TOPICS.filter((t) => t.sectionId === sectionId);

  function addQuestion() {
    setQError('');
    setQSuccess(false);
    if (!qSectionId || !qTopicId || !qText.trim()) {
      setQError('Section, topic, and question text are required.');
      return;
    }
    if (qOptions.some((o) => !o.trim())) {
      setQError('All 4 answer options are required.');
      return;
    }
    if (!qExplanation.trim()) {
      setQError('Explanation is required.');
      return;
    }
    const q: Question = {
      id: `uq-${Date.now()}`,
      topicId: qTopicId,
      sectionId: qSectionId,
      text: qText.trim(),
      options: qOptions.map((o) => o.trim()),
      correctIndex: qCorrect,
      explanation: qExplanation.trim(),
      trapNote: qTrapNote.trim(),
      difficulty: qDifficulty,
    };
    dispatch({ type: 'ADD_USER_QUESTION', payload: q });
    setQText('');
    setQOptions(['', '', '', '']);
    setQCorrect(0);
    setQExplanation('');
    setQTrapNote('');
    setQSuccess(true);
    setTimeout(() => setQSuccess(false), 3000);
  }

  function addMnemonic() {
    setMError('');
    setMSuccess(false);
    if (!mSectionId || !mTopicId || !mTitle.trim() || !mContent.trim() || !mDannyNote.trim()) {
      setMError('Section, topic, title, content, and Danny\'s Note are required.');
      return;
    }
    const card: MnemonicCard = {
      id: `um-${Date.now()}`,
      topicId: mTopicId,
      sectionId: mSectionId,
      title: mTitle.trim(),
      type: mType,
      content: mContent.trim(),
      expansion: mExpansion.trim() ? mExpansion.split('\n').map((l) => l.trim()).filter(Boolean) : undefined,
      dannyNote: mDannyNote.trim(),
      icon: mIcon.trim() || '🧠',
    };
    dispatch({ type: 'ADD_USER_MNEMONIC', payload: card });
    setMTitle('');
    setMContent('');
    setMExpansion('');
    setMDannyNote('');
    setMSuccess(true);
    setTimeout(() => setMSuccess(false), 3000);
  }

  return (
    <div className="page-shell">
      <div className="page-content">
        <h1 className="page-title">Creator Mode</h1>
        <p className="page-subtitle">Add your own questions and mnemonics to the practice pool.</p>

        <div className={styles.tabRow}>
          {(['questions', 'mnemonics'] as Tab[]).map((t) => (
            <button
              key={t}
              className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'questions' ? '❓ Questions' : '🧠 Mnemonics'}
              {t === 'questions' && state.userQuestions.length > 0 && (
                <span className={styles.tabBadge}>{state.userQuestions.length}</span>
              )}
              {t === 'mnemonics' && state.userMnemonics.length > 0 && (
                <span className={styles.tabBadge}>{state.userMnemonics.length}</span>
              )}
            </button>
          ))}
        </div>

        {tab === 'questions' && (
          <>
            <div className={styles.formCard}>
              <p className={styles.formTitle}>Add a question</p>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Section</label>
                  <select
                    className={styles.select}
                    value={qSectionId}
                    onChange={(e) => { setQSectionId(e.target.value); setQTopicId(''); }}
                  >
                    <option value="">— pick section —</option>
                    {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Topic</label>
                  <select
                    className={styles.select}
                    value={qTopicId}
                    onChange={(e) => setQTopicId(e.target.value)}
                    disabled={!qSectionId}
                  >
                    <option value="">— pick topic —</option>
                    {topicsForSection(qSectionId).map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Question text</label>
                <textarea
                  className={styles.textarea}
                  rows={3}
                  placeholder="What does the license law require when..."
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Answer options (A–D)</label>
                {qOptions.map((opt, i) => (
                  <div key={i} className={styles.optionRow}>
                    <span className={`${styles.optLetter} ${qCorrect === i ? styles.optLetterCorrect : ''}`}>{String.fromCharCode(65 + i)}</span>
                    <input
                      className={styles.input}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      value={opt}
                      onChange={(e) => {
                        const next = [...qOptions];
                        next[i] = e.target.value;
                        setQOptions(next);
                      }}
                    />
                    <input
                      type="radio"
                      name="correct"
                      checked={qCorrect === i}
                      onChange={() => setQCorrect(i)}
                      title="Mark as correct"
                    />
                  </div>
                ))}
                <p className={styles.hint}>Select the radio button next to the correct answer.</p>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Difficulty</label>
                  <select className={styles.select} value={qDifficulty} onChange={(e) => setQDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Explanation (shown after answer)</label>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  placeholder="The correct answer is A because..."
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Trap note (optional)</label>
                <input
                  className={styles.input}
                  placeholder="Watch out for..."
                  value={qTrapNote}
                  onChange={(e) => setQTrapNote(e.target.value)}
                />
              </div>

              {qError && <p className={styles.error}>{qError}</p>}
              {qSuccess && <p className={styles.success}>Question added!</p>}

              <button className="btn-primary" onClick={addQuestion} style={{ width: '100%' }}>
                Add question
              </button>
            </div>

            {state.userQuestions.length > 0 && (
              <div className={styles.listSection}>
                <p className={styles.listTitle}>Your questions ({state.userQuestions.length})</p>
                {state.userQuestions.map((q) => (
                  <div key={q.id} className={styles.listItem}>
                    <p className={styles.listItemText}>{q.text}</p>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => dispatch({ type: 'DELETE_USER_QUESTION', payload: q.id })}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'mnemonics' && (
          <>
            <div className={styles.formCard}>
              <p className={styles.formTitle}>Add a mnemonic</p>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Section</label>
                  <select
                    className={styles.select}
                    value={mSectionId}
                    onChange={(e) => { setMSectionId(e.target.value); setMTopicId(''); }}
                  >
                    <option value="">— pick section —</option>
                    {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Topic</label>
                  <select
                    className={styles.select}
                    value={mTopicId}
                    onChange={(e) => setMTopicId(e.target.value)}
                    disabled={!mSectionId}
                  >
                    <option value="">— pick topic —</option>
                    {topicsForSection(mSectionId).map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Title</label>
                  <input className={styles.input} placeholder="e.g. PETE for gov't powers" value={mTitle} onChange={(e) => setMTitle(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Type</label>
                  <select className={styles.select} value={mType} onChange={(e) => setMType(e.target.value as MnemonicType)}>
                    <option value="acronym">Acronym</option>
                    <option value="story">Story</option>
                    <option value="visual">Visual</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Icon (emoji)</label>
                <input className={styles.input} placeholder="🧠" value={mIcon} onChange={(e) => setMIcon(e.target.value)} style={{ maxWidth: 80 }} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Mnemonic content</label>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  placeholder="DEEP-C = Disposition, Enjoyment, Exclusion, Possession, Control"
                  value={mContent}
                  onChange={(e) => setMContent(e.target.value)}
                />
              </div>

              {mType === 'acronym' && (
                <div className={styles.field}>
                  <label className={styles.label}>Expansion (one item per line, optional)</label>
                  <textarea
                    className={styles.textarea}
                    rows={3}
                    placeholder={"D = Disposition\nE = Enjoyment\n..."}
                    value={mExpansion}
                    onChange={(e) => setMExpansion(e.target.value)}
                  />
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label}>Danny&apos;s Note (exam tip)</label>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  placeholder="This shows up because..."
                  value={mDannyNote}
                  onChange={(e) => setMDannyNote(e.target.value)}
                />
              </div>

              {mError && <p className={styles.error}>{mError}</p>}
              {mSuccess && <p className={styles.success}>Mnemonic added!</p>}

              <button className="btn-primary" onClick={addMnemonic} style={{ width: '100%' }}>
                Add mnemonic
              </button>
            </div>

            {state.userMnemonics.length > 0 && (
              <div className={styles.listSection}>
                <p className={styles.listTitle}>Your mnemonics ({state.userMnemonics.length})</p>
                {state.userMnemonics.map((m) => (
                  <div key={m.id} className={styles.listItem}>
                    <div>
                      <p className={styles.listItemText}>{m.icon} {m.title}</p>
                      <p className={styles.listItemSub}>{m.content}</p>
                    </div>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => dispatch({ type: 'DELETE_USER_MNEMONIC', payload: m.id })}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
