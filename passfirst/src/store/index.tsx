'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { AppState, AppAction, TopicProgress, RecallResult, Question, MnemonicCard } from '@/types';
import { QUESTIONS } from '@/data/questions';
import { MNEMONICS } from '@/data/mnemonics';

// ─── Initial State ────────────────────────────────────────────────────────────

const INITIAL_STATE: AppState = {
  user: null,
  topicProgress: {},
  questionAttempts: [],
  studySessions: [],
  favoriteMnemonics: [],
  streak: 0,
  lastActiveDate: undefined,
  userQuestions: [],
  userMnemonics: [],
};

const STORAGE_KEY = 'realestate-exam-app';

// ─── Spaced Repetition ────────────────────────────────────────────────────────

function getNextReviewDate(result: RecallResult): string {
  const now = new Date();
  const days = result === 'easy' ? 4 : result === 'medium' ? 2 : result === 'hard' ? 1 : 0;
  now.setDate(now.getDate() + days);
  return now.toISOString().split('T')[0];
}

function getReadinessFromHistory(history: RecallResult[]): TopicProgress['readiness'] {
  if (history.length === 0) return 'not-started';
  const last3 = history.slice(-3);
  const easyCount = last3.filter((r) => r === 'easy').length;
  const missedCount = last3.filter((r) => r === 'missed').length;
  if (history.length >= 3 && easyCount >= 2) return 'strong';
  if (history.length >= 1 && missedCount === 0) return 'familiar';
  return 'learning';
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'COMPLETE_ONBOARDING':
      if (!state.user) return state;
      return { ...state, user: { ...state.user, onboardingComplete: true } };

    case 'COMPLETE_DIAGNOSTIC':
      if (!state.user) return state;
      return { ...state, user: { ...state.user, diagnosticComplete: true } };

    case 'UPDATE_TOPIC_PROGRESS': {
      const { topicId, result } = action.payload;
      const existing = state.topicProgress[topicId] ?? {
        topicId,
        readiness: 'not-started' as const,
        recallHistory: [],
      };
      const newHistory = [...existing.recallHistory, result];
      const updated: TopicProgress = {
        ...existing,
        recallHistory: newHistory,
        readiness: getReadinessFromHistory(newHistory),
        lastReviewed: new Date().toISOString().split('T')[0],
        nextReviewDate: getNextReviewDate(result),
      };
      return {
        ...state,
        topicProgress: { ...state.topicProgress, [topicId]: updated },
      };
    }

    case 'ADD_QUESTION_ATTEMPT':
      return {
        ...state,
        questionAttempts: [...state.questionAttempts, action.payload],
      };

    case 'TOGGLE_FAVORITE_MNEMONIC': {
      const id = action.payload;
      const favs = state.favoriteMnemonics.includes(id)
        ? state.favoriteMnemonics.filter((f) => f !== id)
        : [...state.favoriteMnemonics, id];
      return { ...state, favoriteMnemonics: favs };
    }

    case 'COMPLETE_SESSION': {
      const { date, topicIds, minutesSpent } = action.payload;
      return {
        ...state,
        studySessions: [...state.studySessions, { date, topicIds, completed: true, minutesSpent }],
      };
    }

    case 'UPDATE_STREAK': {
      const today = new Date().toISOString().split('T')[0];
      const last = state.lastActiveDate;
      if (last === today) return state;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = last === yesterday.toISOString().split('T')[0];
      return {
        ...state,
        streak: wasYesterday ? state.streak + 1 : 1,
        lastActiveDate: today,
      };
    }

    case 'ADD_USER_QUESTION':
      return { ...state, userQuestions: [...state.userQuestions, action.payload] };

    case 'DELETE_USER_QUESTION':
      return { ...state, userQuestions: state.userQuestions.filter((q) => q.id !== action.payload) };

    case 'ADD_USER_MNEMONIC':
      return { ...state, userMnemonics: [...state.userMnemonics, action.payload] };

    case 'DELETE_USER_MNEMONIC':
      return { ...state, userMnemonics: state.userMnemonics.filter((m) => m.id !== action.payload) };

    case 'RESET':
      return INITIAL_STATE;

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  updateTopicProgress: (topicId: string, result: RecallResult) => void;
  toggleFavorite: (mnemonicId: string) => void;
  isFavorite: (mnemonicId: string) => boolean;
  allQuestions: Question[];
  allMnemonics: MnemonicCard[];
}

const AppContext = createContext<AppContextValue | null>(null);

function loadState(): AppState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    return { ...INITIAL_STATE, ...JSON.parse(raw) };
  } catch {
    return INITIAL_STATE;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateTopicProgress = useCallback(
    (topicId: string, result: RecallResult) => {
      dispatch({ type: 'UPDATE_TOPIC_PROGRESS', payload: { topicId, result } });
    },
    []
  );

  const toggleFavorite = useCallback(
    (mnemonicId: string) => {
      dispatch({ type: 'TOGGLE_FAVORITE_MNEMONIC', payload: mnemonicId });
    },
    []
  );

  const isFavorite = useCallback(
    (mnemonicId: string) => state.favoriteMnemonics.includes(mnemonicId),
    [state.favoriteMnemonics]
  );

  const allQuestions = [...QUESTIONS, ...state.userQuestions];
  const allMnemonics = [...MNEMONICS, ...state.userMnemonics];

  return (
    <AppContext.Provider value={{ state, dispatch, updateTopicProgress, toggleFavorite, isFavorite, allQuestions, allMnemonics }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// ─── Derived selectors ────────────────────────────────────────────────────────

export function useTopicProgress(topicId: string) {
  const { state } = useApp();
  return state.topicProgress[topicId] ?? {
    topicId,
    readiness: 'not-started' as const,
    recallHistory: [],
  };
}

export function useTopicsDueForReview() {
  const { state } = useApp();
  const today = new Date().toISOString().split('T')[0];
  return Object.values(state.topicProgress).filter((tp) => {
    if (!tp.nextReviewDate) return false;
    return tp.nextReviewDate <= today;
  });
}

export function useOverallStats() {
  const { state } = useApp();
  const progresses = Object.values(state.topicProgress);
  const strong = progresses.filter((p) => p.readiness === 'strong').length;
  const familiar = progresses.filter((p) => p.readiness === 'familiar').length;
  const learning = progresses.filter((p) => p.readiness === 'learning').length;
  const total = 24;
  const readinessScore = Math.round(((strong * 3 + familiar * 2 + learning * 1) / (total * 3)) * 100);

  const attempts = state.questionAttempts;
  const correctAttempts = attempts.filter((a) => a.correct).length;
  const accuracy = attempts.length > 0 ? Math.round((correctAttempts / attempts.length) * 100) : 0;

  return { strong, familiar, learning, notStarted: total - progresses.length, total, readinessScore, accuracy };
}
