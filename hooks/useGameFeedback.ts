import { useEffect } from 'react';
import { AnimationControls } from 'framer-motion';

type FeedbackType = 'correct' | 'incorrect' | null;

interface UseGameFeedbackProps {
  feedback: FeedbackType;
  clearFeedback: () => void;
  controls: AnimationControls;
}

/**
 * フィードバックアニメーションの管理
 * 正解・不正解時のエフェクトとタイマー
 */
export const useGameFeedback = ({ feedback, clearFeedback, controls }: UseGameFeedbackProps) => {
  useEffect(() => {
    if (feedback === 'correct') {
      const timer = setTimeout(clearFeedback, 400);
      return () => clearTimeout(timer);
    } else if (feedback === 'incorrect') {
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 },
      });
      const timer = setTimeout(clearFeedback, 400);
      return () => clearTimeout(timer);
    }
  }, [feedback, clearFeedback, controls]);
};
