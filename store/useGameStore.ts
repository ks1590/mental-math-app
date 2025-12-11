import { create } from 'zustand';
import { generateProblem, Problem, DifficultyLevel } from '@/lib/math-engine';

type GameStatus = 'idle' | 'countdown' | 'playing' | 'finished';
type FeedbackType = 'correct' | 'incorrect' | null;
type GameMode = 'normal' | 'survival';

interface GameState {
  status: GameStatus;
  currentProblem: Problem | null;
  score: number;
  combo: number;
  maxCombo: number;
  timeLeft: number;
  feedback: FeedbackType;
  difficultyLevel: DifficultyLevel;
  gameMode: GameMode;
  questionsAnswered: number;
  tickSpeed: number;

  setDifficulty: (level: DifficultyLevel) => void;
  setGameMode: (mode: GameMode) => void;
  startGame: (duration?: number) => void;
  submitAnswer: (answer: number) => void;
  tick: () => void;
  resetGame: () => void;
  clearFeedback: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  status: 'idle',
  currentProblem: null,
  score: 0,
  combo: 0,
  maxCombo: 0,
  timeLeft: 30,
  feedback: null,
  difficultyLevel: 0,
  gameMode: 'normal',
  questionsAnswered: 0,
  tickSpeed: 1000,

  setDifficulty: (level: DifficultyLevel) => {
    set({ difficultyLevel: level });
  },

  setGameMode: (mode: GameMode) => {
    set({ gameMode: mode });
  },

  startGame: (duration?: number) => {
    const { difficultyLevel, gameMode } = get();
    const initialTime = duration ?? (gameMode === 'survival' ? 10 : 30);
    set({
      status: 'countdown',
      score: 0,
      combo: 0,
      maxCombo: 0,
      timeLeft: initialTime,
      currentProblem: generateProblem(difficultyLevel),
      feedback: null,
      questionsAnswered: 0,
      tickSpeed: 1000,
    });
  },

  tick: () => {
    const { timeLeft, status } = get();
    if (status !== 'playing') return;

    if (timeLeft <= 1) {
      set({ status: 'finished', timeLeft: 0 });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  submitAnswer: (answer: number) => {
    const { currentProblem, combo, score, maxCombo, status, difficultyLevel, gameMode, questionsAnswered, timeLeft } =
      get();
    if (status !== 'playing' || !currentProblem) return;

    const isCorrect = answer === currentProblem.answer;

    if (isCorrect) {
      const newCombo = combo + 1;
      const newQuestionsAnswered = questionsAnswered + 1;

      // Survival mode: add time on correct answer
      let newTimeLeft = timeLeft;
      if (gameMode === 'survival') {
        newTimeLeft = Math.min(timeLeft + 3, 30); // Cap at 30 seconds
      }

      // Calculate new tick speed based on questions answered
      let newTickSpeed = 1000;
      if (gameMode === 'survival') {
        if (newQuestionsAnswered >= 30) {
          newTickSpeed = 500; // 2x speed
        } else if (newQuestionsAnswered >= 20) {
          newTickSpeed = 667; // 1.5x speed
        } else if (newQuestionsAnswered >= 10) {
          newTickSpeed = 833; // 1.2x speed
        }
      }

      set({
        score: score + 10 + combo * 2,
        combo: newCombo,
        maxCombo: Math.max(maxCombo, newCombo),
        feedback: 'correct',
        currentProblem: generateProblem(difficultyLevel),
        questionsAnswered: newQuestionsAnswered,
        timeLeft: newTimeLeft,
        tickSpeed: newTickSpeed,
      });
    } else {
      set({
        combo: 0,
        feedback: 'incorrect',
      });
    }
  },

  resetGame: () => {
    set({
      status: 'idle',
      currentProblem: null,
      score: 0,
      combo: 0,
      maxCombo: 0,
      timeLeft: 30,
      feedback: null,
      questionsAnswered: 0,
      tickSpeed: 1000,
    });
  },

  clearFeedback: () => {
    set({ feedback: null });
  },
}));
