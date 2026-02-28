'use client';

import Link from 'next/link';
import { useApp, useOverallStats, useTopicsDueForReview } from '@/store';
import { SECTIONS, ALL_TOPICS } from '@/data/sections';
import { QUESTIONS } from '@/data/questions';
import ReadinessBar from '@/components/ReadinessBar';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { state, dispatch } = useApp();
  const stats = useOverallStats();
  const dueTopics = useTopicsDueForReview();

  const attemptsBySection = SECTIONS.map((section) => {
    const sectionQuestionIds = new Set(
      QUESTIONS.filter((q) => q.sectionId === section.id).map((q) => q.id)
    );
    const sectionAttempts = state.questionAttempts.filter((a) => sectionQuestionIds.has(a.questionId));
    const correct = sectionAttempts.filter((a) => a.correct).length;
    const total = sectionAttempts.length;
    const strongCount = section.topics.filter(
      (t) => state.topicProgress[t.id]?.readiness === 'strong'
    ).length;
    return { section, correct, total, strongCount };
  });

  // Weak topics (learning or never started but attempted)
  const weakTopics = ALL_TOPICS.filter((t) => {
    const p = state.topicProgress[t.id];
    return p && (p.readiness === 'learning' || p.recallHistory.filter((r) => r === 'missed').length > 0);
  }).slice(0, 5);

  // Miss reason totals
  const missReasons: Record<string, number> = {};
  state.questionAttempts.forEach((a) => {
    if (a.missReason) missReasons[a.missReason] = (missReasons[a.missReason] ?? 0) + 1;
  });

  return (
    <div className="page-shell">
      <div className="page-content">
        <h1 className="page-title">My Progress</h1>
        <p className="page-subtitle">
          {state.user?.state === 'national' ? 'National Exam' : `${state.user?.state ?? ''} Exam`}
          {state.user?.examDate ? ` · Exam: ${new Date(state.user.examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}
        </p>

        {/* Overall readiness */}
        <div className={styles.overallCard}>
          <div className={styles.overallHeader}>
            <div>
              <p className={styles.overallLabel}>Overall Readiness</p>
              <p className={styles.overallScore}>{stats.readinessScore}%</p>
            </div>
            <div className={styles.streakBadge}>
              <span>🔥</span>
              <span className={styles.streakNum}>{state.streak} day streak</span>
            </div>
          </div>
          <div className={styles.overallTrack}>
            <div className={styles.overallFill} style={{ width: `${stats.readinessScore}%` }} />
          </div>
          <div className={styles.overallPills}>
            {[
              { label: 'Strong', count: stats.strong, color: 'var(--color-success)', bg: 'var(--color-success-light)' },
              { label: 'Familiar', count: stats.familiar, color: 'var(--color-primary)', bg: 'var(--color-primary-light)' },
              { label: 'Learning', count: stats.learning, color: 'var(--color-warning)', bg: 'var(--color-warning-light)' },
              { label: 'New', count: stats.notStarted, color: 'var(--color-text-muted)', bg: 'var(--color-bg)' },
            ].map((p) => (
              <div key={p.label} className={styles.pill} style={{ background: p.bg }}>
                <span style={{ color: p.color, fontWeight: 700 }}>{p.count}</span>
                <span style={{ color: p.color, fontSize: 11 }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Q&A accuracy */}
        <div className={styles.accuracyCard}>
          <div className={styles.accuracyLeft}>
            <p className={styles.accuracyLabel}>Question Accuracy</p>
            <p className={styles.accuracyNum}>{stats.accuracy}%</p>
            <p className={styles.accuracyMeta}>{state.questionAttempts.length} answered total</p>
          </div>
          <div className={styles.accuracyRight}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-bg)" strokeWidth="8" />
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={stats.accuracy >= 70 ? 'var(--color-success)' : stats.accuracy >= 50 ? 'var(--color-primary)' : 'var(--color-danger)'}
                strokeWidth="8"
                strokeDasharray={`${(stats.accuracy / 100) * 175.9} 175.9`}
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
              />
            </svg>
          </div>
        </div>

        {/* Due for review */}
        {dueTopics.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Due for Review</h2>
              <span className={styles.badge} style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
                {dueTopics.length}
              </span>
            </div>
            <div className={styles.topicRows}>
              {dueTopics.map((tp) => {
                const topicData = ALL_TOPICS.find((t) => t.id === tp.topicId);
                if (!topicData) return null;
                const sec = SECTIONS.find((s) => s.id === topicData.sectionId)!;
                return (
                  <Link key={tp.topicId} href={`/topics/${tp.topicId}`} className={styles.topicRow}>
                    <span className={styles.topicIcon}>{sec.icon}</span>
                    <div className={styles.topicMeta}>
                      <p className={styles.topicName}>{topicData.title}</p>
                      <ReadinessBar readiness={tp.readiness} size="sm" />
                    </div>
                    <span className={styles.chevron}>›</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Weak topics */}
        {weakTopics.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Focus On These</h2>
            </div>
            <div className={styles.topicRows}>
              {weakTopics.map((topic) => {
                const sec = SECTIONS.find((s) => s.id === topic.sectionId)!;
                const p = state.topicProgress[topic.id];
                return (
                  <Link key={topic.id} href={`/topics/${topic.id}`} className={styles.topicRow}>
                    <span className={styles.topicIcon}>{sec.icon}</span>
                    <div className={styles.topicMeta}>
                      <p className={styles.topicName}>{topic.title}</p>
                      <ReadinessBar readiness={p?.readiness ?? 'not-started'} size="sm" />
                    </div>
                    <span className={styles.chevron}>›</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Section breakdown */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>By Section</h2>
          <div className={styles.sectionCards}>
            {attemptsBySection.map(({ section, strongCount }) => {
              const readinessPct = Math.round((strongCount / section.topics.length) * 100);
              return (
                <div key={section.id} className={styles.sectionCard}>
                  <div className={styles.sectionCardHeader}>
                    <span className={styles.sectionCardIcon}>{section.icon}</span>
                    <div className={styles.sectionCardMeta}>
                      <p className={styles.sectionCardTitle}>{section.title}</p>
                      <p className={styles.sectionCardWeight}>{section.examWeight}% of exam</p>
                    </div>
                    <span className={styles.sectionCardPct}>{readinessPct}%</span>
                  </div>
                  <div className={styles.miniTrack}>
                    <div
                      className={styles.miniFill}
                      style={{
                        width: `${readinessPct}%`,
                        background: readinessPct >= 80 ? 'var(--color-success)' :
                                    readinessPct >= 40 ? 'var(--color-primary)' : 'var(--color-warning)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wipe data */}
        <div className={styles.dangerZone}>
          <p className={styles.dangerLabel}>Reset</p>
          <button
            className={styles.resetBtn}
            onClick={() => {
              if (confirm('Reset all progress? This cannot be undone.')) {
                dispatch({ type: 'RESET' });
              }
            }}
          >
            Reset all progress
          </button>
        </div>

      </div>
    </div>
  );
}
