'use client';

import { useAnimation } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { Star, RotateCcw, Trophy, Timer } from 'lucide-react';
import { Feedback } from './Feedback';
import { DifficultySelector } from './DifficultySelector';
import { GameModeSelector } from './GameModeSelector';
import { ScorePopup } from './ScorePopup';
import { ScoreDisplay } from './ScoreDisplay';
import { useGameTimer, useGameFeedback, useCountdown, useOperationColor } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

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
    tickSpeed
  } = useGameStore();
  
  const controls = useAnimation();
  const [prevScore, setPrevScore] = useState(0);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [scoreGain, setScoreGain] = useState(0);

  // Custom hooks for logic separation
  useGameTimer({ status, timeLeft, tick, tickSpeed });
  useGameFeedback({ feedback, clearFeedback, controls });
  
  const { countdown } = useCountdown({ 
    status, 
    onComplete: () => useGameStore.setState({ status: 'playing' })
  });
  
  const { getOperationColor } = useOperationColor();

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
      
      {/* Header Info - Only show during gameplay */}
      {(status === 'playing') && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Timer className="text-blue-500" />
            <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
              {timeLeft}秒
            </span>
          </div>
          <ScoreDisplay score={score} combo={combo} />
        </div>
      )}

      {/* Survival Mode Stats */}
      {status === 'playing' && gameMode === 'survival' && (
        <div className="flex justify-center gap-3 mb-4">
          <div className="bg-white/80 px-3 py-1 rounded-full shadow-sm">
            <span className="text-sm font-bold text-gray-600">
              {questionsAnswered}問クリア
            </span>
          </div>
          {tickSpeed < 1000 && (
            <div className="bg-orange-100 px-3 py-1 rounded-full shadow-sm">
              <span className="text-sm font-bold text-orange-600">
                ×{(1000 / tickSpeed).toFixed(1)}倍速
              </span>
            </div>
          )}
        </div>
      )}

      <AnimatePresence mode='wait'>
        {status === 'idle' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-10"
          >
            <h1 className="text-4xl font-black text-orange-500 mb-2 tracking-tighter">
              暗算クエスト
            </h1>
            <p className="text-gray-500 mb-8 font-bold">めざせ！計算マスター</p>
            
            <GameModeSelector 
              selectedMode={gameMode}
              onSelectMode={setGameMode}
            />
            
            <DifficultySelector 
              selectedLevel={difficultyLevel}
              onSelectLevel={setDifficulty}
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame()}
              className="mt-10 bg-gradient-to-b from-sky-400 to-sky-500 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg border-b-4 border-sky-600 active:border-b-0 active:translate-y-1"
            >
              スタート！
            </motion.button>
          </motion.div>
        )}

        {status === 'countdown' && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="text-center py-20"
          >
            <motion.div
              key={countdown}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mb-4"
            >
              {countdown > 0 ? (
                <span className="text-9xl font-black text-sky-500 drop-shadow-lg">
                  {countdown}
                </span>
              ) : (
                <span className="text-7xl font-black text-yellow-400 drop-shadow-lg">
                  GO!
                </span>
              )}
            </motion.div>
            <p className="text-gray-500 font-bold text-lg">準備はいいかな？</p>
          </motion.div>
        )}

        {status === 'playing' && currentProblem && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center relative"
          >
            {/* Combo Display */}
            <div className="h-8 mb-2">
              {combo >= 2 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  className="text-orange-500 font-black text-lg flex justify-center items-center gap-1 mt-8"
                >
                  <Star size={20} fill="currentColor" />
                  {combo} コンボ！
                  <Star size={20} fill="currentColor" />
                </motion.div>
              )}
            </div>

            {/* Problem Area */}
            <div className="relative mb-8">
               <Feedback type={feedback} />
               <ScorePopup score={scoreGain} isVisible={showScorePopup} />

              <motion.div
                animate={
                    feedback === 'correct' ? { scale: [1, 1.1, 1] } :
                    feedback === 'incorrect' ? controls : {}
                }
                className="bg-slate-100 rounded-3xl py-10 px-4 shadow-inner border-2 border-slate-200"
              >
                <div className="flex justify-center items-center gap-2 md:gap-4 text-5xl md:text-6xl font-black text-slate-700">
                  <span>{currentProblem.operands.a}</span>
                  <span className={getOperationColor(currentProblem.operation)}>
                    {currentProblem.operation === 'add' && '+'}
                    {currentProblem.operation === 'subtract' && '-'}
                    {currentProblem.operation === 'multiply' && '×'}
                    {currentProblem.operation === 'divide' && '÷'}
                  </span>
                  <span>{currentProblem.operands.b}</span>
                  <span className="text-gray-400">=</span>
                  <span className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-blue-500">
                    ?
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Choice Buttons */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs mx-auto mt-4">
              {currentProblem.choices.map((choice) => (
                <motion.button
                  key={`${currentProblem.id}-${choice}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => feedback === null && submitAnswer(choice)}
                  className="bg-white border-b-4 border-orange-200 text-orange-600 text-3xl font-black py-6 rounded-2xl shadow-lg active:border-b-0 active:translate-y-1 transition-all"
                >
                  {choice}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {status === 'finished' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="mb-6">
              <Trophy size={80} className="mx-auto text-yellow-400 mb-8 drop-shadow-md" />
              <h2 className="text-3xl font-black text-gray-700 mb-4">よくできました！</h2>
              <p className="text-gray-500 font-bold">今回のスコア</p>
              <p className="text-6xl font-black text-sky-500 my-4">{score}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8 text-left bg-white p-4 rounded-xl shadow-sm">
              <div>
                <p className="text-xs text-gray-400 font-bold">さいだいコンボ</p>
                <p className="text-xl font-bold text-gray-700">{maxCombo} 回</p>
              </div>
              <div>
                {gameMode === 'survival' ? (
                  <>
                    <p className="text-xs text-gray-400 font-bold">クリア数</p>
                    <p className="text-xl font-bold text-orange-500">{questionsAnswered}問</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-gray-400 font-bold">ランク</p>
                    <p className="text-xl font-bold text-orange-500">
                      {score > 300 ? 'SS' : score > 200 ? 'S' : score > 100 ? 'A' : 'B'}
                    </p>
                  </>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame(30)}
              className="flex items-center justify-center gap-2 w-full bg-sky-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg hover:bg-sky-600 transition-colors"
            >
              <RotateCcw size={24} />
              もういちど遊ぶ
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
