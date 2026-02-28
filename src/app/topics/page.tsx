'use client';

import Link from 'next/link';
import { useApp } from '@/store';
import { SECTIONS } from '@/data/sections';
import ReadinessBar from '@/components/ReadinessBar';
import styles from './topics.module.css';

export default function TopicsPage() {
  const { state } = useApp();

  return (
    <div className="page-shell">
      <div className="page-content">
        <h1 className="page-title">Topic Map</h1>
        <p className="page-subtitle">8 sections · 24 topics. Track your readiness on each one.</p>

        <div className={styles.sections}>
          {SECTIONS.map((section) => {
            const sectionTopics = section.topics;
            const strongCount = sectionTopics.filter(
              (t) => state.topicProgress[t.id]?.readiness === 'strong'
            ).length;
            const sectionProgress = Math.round((strongCount / sectionTopics.length) * 100);

            return (
              <div key={section.id} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIcon}>{section.icon}</span>
                  <div className={styles.sectionMeta}>
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                    <p className={styles.sectionDesc}>{section.description}</p>
                  </div>
                  <span className={styles.examWeight}>{section.examWeight}%</span>
                </div>

                <div className={styles.sectionProgressRow}>
                  <span className={styles.progressLabel}>{strongCount}/{sectionTopics.length} mastered</span>
                  <div className={styles.sectionTrack}>
                    <div className={styles.sectionFill} style={{ width: `${sectionProgress}%` }} />
                  </div>
                </div>

                <div className={styles.topicList}>
                  {sectionTopics.map((topic) => {
                    const progress = state.topicProgress[topic.id];
                    const readiness = progress?.readiness ?? 'not-started';
                    return (
                      <Link key={topic.id} href={`/topics/${topic.id}`} className={styles.topicRow}>
                        <div className={styles.topicLeft}>
                          <p className={styles.topicTitle}>{topic.title}</p>
                          <ReadinessBar readiness={readiness} size="sm" />
                        </div>
                        <span className={styles.topicChevron}>›</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
