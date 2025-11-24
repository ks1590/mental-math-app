import { useState, useEffect } from 'react';

type GameStatus = 'idle' | 'countdown' | 'playing' | 'finished';

interface UseCountdownProps {
  status: GameStatus;
  onComplete: () => void;
}

interface UseCountdownReturn {
  countdown: number;
}

/**
 * ゲーム開始前のカウントダウン管理（3-2-1-GO）
 */
export const useCountdown = ({ status, onComplete }: UseCountdownProps): UseCountdownReturn => {
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    if (status === 'countdown') {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Transition to playing after countdown
            setTimeout(() => {
              onComplete();
            }, 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, onComplete]);

  return { countdown };
};
