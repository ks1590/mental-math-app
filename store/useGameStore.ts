import { create } from 'zustand';
import { generateProblem, Problem, DifficultyLevel } from '@/lib/math-engine';

type GameStatus = 'idle' | 'countdown' | 'playing' | 'finished';
type FeedbackType = 'correct' | 'incorrect' | null;

interface GameState {
  status: GameStatus;
  currentProblem: Problem | null;
  score: number;
  combo: number;
  maxCombo: number;
  timeLeft: number;
  feedback: FeedbackType;
  difficultyLevel: DifficultyLevel;
  
  setDifficulty: (level: DifficultyLevel) => void;
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

  setDifficulty: (level: DifficultyLevel) => {
    set({ difficultyLevel: level });
  },

  startGame: (duration = 30) => {
    const { difficultyLevel } = get();
    set({
      status: 'countdown',
      score: 0,
      combo: 0,
      maxCombo: 0,
      timeLeft: duration,
      currentProblem: generateProblem(difficultyLevel),
      feedback: null,
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
    const { currentProblem, combo, score, maxCombo, status, difficultyLevel } = get();
    if (status !== 'playing' || !currentProblem) return;

    const isCorrect = answer === currentProblem.answer;

    if (isCorrect) {
      const newCombo = combo + 1;
      set({
        score: score + 10 + (combo * 2),
        combo: newCombo,
        maxCombo: Math.max(maxCombo, newCombo),
        feedback: 'correct',
        currentProblem: generateProblem(difficultyLevel),
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
      feedback: null 
    });
  },

  clearFeedback: () => {
    set({ feedback: null });
  }
}));
