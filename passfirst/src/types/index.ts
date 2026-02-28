
// ─── Exam & Content ──────────────────────────────────────────────────────────

export type USState = 'national' | 'california' | 'texas' | 'florida' | 'new-york';

export type ReadinessLevel = 'not-started' | 'learning' | 'familiar' | 'strong';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type RecallResult = 'easy' | 'medium' | 'hard' | 'missed';

export type MnemonicType = 'acronym' | 'story' | 'visual';

export type MissReason = 'forgot-rule' | 'mixed-concepts' | 'rushed' | 'tricky-wording';

// ─── Data Model ───────────────────────────────────────────────────────────────

export interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
  examWeight: number; // percentage of exam
  topics: Topic[];
}

export interface Topic {
  id: string;
  sectionId: string;
  title: string;
  summary: string;
  examTip: string;
  microLessonId: string;
}

export interface MicroLesson {
  id: string;
  topicId: string;
  title: string;
  whatItIs: string;
  whyItMatters: string;
  examTrap: string;
  mnemonic: string;
  example: string;
  recallPrompts: string[];
}

export interface MnemonicCard {
  id: string;
  topicId: string;
  sectionId: string;
  title: string;
  type: MnemonicType;
  content: string;         // the mnemonic itself
  expansion?: string[];    // for acronyms: what each letter means
  dannyNote: string;       // "This WILL show up because…"
  icon: string;
}

export interface Question {
  id: string;
  topicId: string;
  sectionId: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  trapNote: string;
  difficulty: Difficulty;
}

// ─── User Progress ────────────────────────────────────────────────────────────

export interface TopicProgress {
  topicId: string;
  readiness: ReadinessLevel;
  lastReviewed?: string;    // ISO date string
  nextReviewDate?: string;  // ISO date string
  recallHistory: RecallResult[];
}

export interface UserProfile {
  state: USState;
  examDate?: string;        // ISO date string
  dailyMinutes: 10 | 20 | 40;
  onboardingComplete: boolean;
  diagnosticComplete: boolean;
  createdAt: string;
}

export interface StudySession {
  date: string;
  topicIds: string[];
  completed: boolean;
  minutesSpent?: number;
}

export interface QuestionAttempt {
  questionId: string;
  correct: boolean;
  selectedIndex: number;
  missReason?: MissReason;
  timestamp: string;
}

// ─── Traps & Twins ────────────────────────────────────────────────────────────

export interface TrapConcept {
  name: string;
  description: string;
  keyFact: string;
}

export interface TrapQuestion {
  id: string;
  text: string;
  answer: 'A' | 'B' | 'C';
  explanation: string;
}

export interface TrapPair {
  id: string;
  title: string;
  sectionId: string;
  conceptA: TrapConcept;
  conceptB: TrapConcept;
  conceptC?: TrapConcept;
  mnemonic: string;
  dannyNote: string;
  questions: TrapQuestion[];
}

// ─── App State ────────────────────────────────────────────────────────────────

export interface AppState {
  user: UserProfile | null;
  topicProgress: Record<string, TopicProgress>;
  questionAttempts: QuestionAttempt[];
  studySessions: StudySession[];
  favoriteMnemonics: string[];
  streak: number;
  lastActiveDate?: string;
  userQuestions: Question[];
  userMnemonics: MnemonicCard[];
}

export type AppAction =
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'COMPLETE_DIAGNOSTIC' }
  | { type: 'UPDATE_TOPIC_PROGRESS'; payload: { topicId: string; result: RecallResult } }
  | { type: 'ADD_QUESTION_ATTEMPT'; payload: QuestionAttempt }
  | { type: 'TOGGLE_FAVORITE_MNEMONIC'; payload: string }
  | { type: 'COMPLETE_SESSION'; payload: { date: string; topicIds: string[]; minutesSpent: number } }
  | { type: 'UPDATE_STREAK' }
  | { type: 'ADD_USER_QUESTION'; payload: Question }
  | { type: 'DELETE_USER_QUESTION'; payload: string }
  | { type: 'ADD_USER_MNEMONIC'; payload: MnemonicCard }
  | { type: 'DELETE_USER_MNEMONIC'; payload: string }
  | { type: 'RESET' };
