import { useEffect } from 'react';

type GameStatus = 'idle' | 'countdown' | 'playing' | 'finished';

interface UseGameTimerProps {
  status: GameStatus;
  timeLeft: number;
  tick: () => void;
  tickSpeed: number;
}

/**
 * ゲームタイマーの管理
 * 動的な速度でカウントダウンを実行
 */
export const useGameTimer = ({ status, timeLeft, tick, tickSpeed }: UseGameTimerProps) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        tick();
      }, tickSpeed);
    }
    return () => clearInterval(timer);
  }, [status, timeLeft, tick, tickSpeed]);
};
