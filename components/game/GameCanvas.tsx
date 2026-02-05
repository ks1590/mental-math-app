'use client';

import { useAnimation } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { useGameTimer, useGameFeedback } from '@/hooks';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GameStartScreen } from './screens/GameStartScreen';
import { GameCountdown } from './screens/GameCountdown';
import { GamePlayingScreen } from './screens/GamePlayingScreen';
import { GameResultScreen } from './screens/GameResultScreen';

export const GameCanvas = () => {
  const {
    status,
    currentProblem,
    submitAnswer,
    feedback,
    clearFeedback,
    score,
    combo,
    maxCombo,
    timeLeft,
    startGame,
    tick,
    difficultyLevel,
    setDifficulty,
    gameMode,
    setGameMode,
    questionsAnswered,
    tickSpeed,
  } = useGameStore();

  const controls = useAnimation();
  const [prevScore, setPrevScore] = useState(0);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [scoreGain, setScoreGain] = useState(0);

  // Custom hooks for logic separation
  useGameTimer({ status, timeLeft, tick, tickSpeed });
  useGameFeedback({ feedback, clearFeedback, controls });

  // Confetti logic has been moved to GameResultScreen via useConfetti hook

  // Score popup logic
  useEffect(() => {
    if (score > prevScore && status === 'playing') {
      const gain = score - prevScore;
      setScoreGain(gain);
      setShowScorePopup(true);
      setPrevScore(score);

      // Hide popup after animation
      const timer = setTimeout(() => {
        setShowScorePopup(false);
      }, 1200);

      return () => clearTimeout(timer);
    } else if (status === 'idle' || status === 'countdown') {
      setPrevScore(0);
      setShowScorePopup(false);
      setScoreGain(0);
    }
  }, [score, prevScore, status]);

  return (
    <div className="w-full max-w-md bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-4 border-white relative">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <GameStartScreen
            key="start-screen"
            gameMode={gameMode}
            setGameMode={setGameMode}
            difficultyLevel={difficultyLevel}
            setDifficulty={setDifficulty}
            startGame={startGame}
          />
        )}

        {status === 'countdown' && <GameCountdown key="countdown-screen" status={status} />}

        {status === 'playing' && (
          <GamePlayingScreen
            key="playing-screen"
            status={status}
            timeLeft={timeLeft}
            score={score}
            combo={combo}
            questionsAnswered={questionsAnswered}
            gameMode={gameMode}
            tickSpeed={tickSpeed}
            currentProblem={currentProblem}
            feedback={feedback}
            showScorePopup={showScorePopup}
            scoreGain={scoreGain}
            submitAnswer={submitAnswer}
            controls={controls}
          />
        )}

        {status === 'finished' && (
          <GameResultScreen
            key="result-screen"
            status={status}
            score={score}
            maxCombo={maxCombo}
            questionsAnswered={questionsAnswered}
            gameMode={gameMode}
            startGame={startGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
