'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useApp, useOverallStats, useTopicsDueForReview } from '@/store';
import { SECTIONS, ALL_TOPICS } from '@/data/sections';
import styles from './home.module.css';

export default function HomePage() {
  const { state, dispatch } = useApp();
  const stats = useOverallStats();
  const dueTopics = useTopicsDueForReview();

  // Build today's session: due for review first, then new topics
  const todayTopics = useMemo(() => {
    const daily = state.user?.dailyMinutes ?? 20;
    const maxTopics = daily === 10 ? 2 : daily === 20 ? 3 : 5;

    const dueIds = new Set(dueTopics.map((t) => t.topicId));
    const dueList = ALL_TOPICS.filter((t) => dueIds.has(t.id)).slice(0, maxTopics);
    const remaining = maxTopics - dueList.length;

    const notStarted = ALL_TOPICS.filter(
      (t) => !state.topicProgress[t.id] && !dueIds.has(t.id)
    ).slice(0, remaining);

    return [...dueList, ...notStarted].slice(0, maxTopics);
  }, [state.user?.dailyMinutes, state.topicProgress, dueTopics]);

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  const completedToday = state.studySessions.some(
    (s) => s.date === new Date().toISOString().split('T')[0] && s.completed
  );

  function markSessionComplete() {
    dispatch({
      type: 'COMPLETE_SESSION',
      payload: {
        date: new Date().toISOString().split('T')[0],
        topicIds: todayTopics.map((t) => t.id),
        minutesSpent: state.user?.dailyMinutes ?? 20,
      },
    });
    dispatch({ type: 'UPDATE_STREAK' });
  }

  return (
    <div className="page-shell">
      <div className="page-content">

        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.date}>{todayDate}</p>
            <h1 className={styles.title}>Good {getTimeOfDay()}</h1>
          </div>
          <div className={styles.streakBadge}>
            <span className={styles.streakFire}>🔥</span>
            <span className={styles.streakNum}>{state.streak}</span>
          </div>
        </div>

        {/* Readiness bar */}
        <div className={styles.readinessCard}>
          <div className={styles.readinessRow}>
            <span className={styles.readinessLabel}>Overall Readiness</span>
            <span className={styles.readinessScore}>{stats.readinessScore}%</span>
          </div>
          <div className={styles.readinessTrack}>
            <div
              className={styles.readinessFill}
              style={{ width: `${stats.readinessScore}%` }}
            />
          </div>
          <div className={styles.readinessStats}>
            <span>💪 {stats.strong} strong</span>
            <span>📖 {stats.familiar} familiar</span>
            <span>🌱 {stats.learning} learning</span>
            <span>⬜ {stats.notStarted} new</span>
          </div>
        </div>

        {/* Today's Session */}
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Today&apos;s Session</h2>
          <span className={styles.sessionTime}>{state.user?.dailyMinutes ?? 20} min</span>
        </div>

        {completedToday ? (
          <div className={styles.completedBanner}>
            <span>🎉</span>
            <div>
              <p className={styles.completedTitle}>Session complete!</p>
              <p className={styles.completedSub}>Come back tomorrow to keep your streak going.</p>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.topicList}>
              {todayTopics.map((topic, i) => {
                const section = SECTIONS.find((s) => s.id === topic.sectionId)!;
                const progress = state.topicProgress[topic.id];
                const isDue = dueTopics.some((d) => d.topicId === topic.id);
                return (
                  <Link key={topic.id} href={`/topics/${topic.id}`} className={styles.topicItem}>
                    <span className={styles.topicNum}>{i + 1}</span>
                    <span className={styles.topicIcon}>{section.icon}</span>
                    <div className={styles.topicInfo}>
                      <p className={styles.topicTitle}>{topic.title}</p>
                      <p className={styles.topicSection}>{section.title}</p>
                    </div>
                    <div className={styles.topicRight}>
                      {isDue ? (
                        <span className={styles.dueBadge}>Review</span>
                      ) : !progress ? (
                        <span className={styles.newBadge}>New</span>
                      ) : null}
                      <span className={styles.chevron}>›</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <button className={`btn-primary ${styles.doneBtn}`} onClick={markSessionComplete}>
              Mark session done ✓
            </button>
          </>
        )}

        {/* Quick Actions */}
        <div className={styles.quickSection}>
          <h2 className={styles.sectionTitle}>Quick access</h2>
          <div className={styles.quickGrid}>
            <Link href="/practice" className={styles.quickCard}>
              <span className={styles.quickIcon}>✏️</span>
              <span className={styles.quickLabel}>Practice Questions</span>
              <span className={styles.quickStat}>{stats.accuracy}% accuracy</span>
            </Link>
            <Link href="/mnemonics" className={styles.quickCard}>
              <span className={styles.quickIcon}>🧠</span>
              <span className={styles.quickLabel}>Mnemonic Library</span>
              <span className={styles.quickStat}>{state.favoriteMnemonics.length} saved</span>
            </Link>
            <Link href="/topics" className={styles.quickCard}>
              <span className={styles.quickIcon}>📚</span>
              <span className={styles.quickLabel}>Topic Map</span>
              <span className={styles.quickStat}>{stats.total} topics</span>
            </Link>
            <Link href="/dashboard" className={styles.quickCard}>
              <span className={styles.quickIcon}>📊</span>
              <span className={styles.quickLabel}>My Progress</span>
              <span className={styles.quickStat}>{dueTopics.length} due</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
