'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { Star, RotateCcw, Trophy, Timer } from 'lucide-react';
import { Feedback } from './Feedback';

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
    tick
  } = useGameStore();
  
  const controls = useAnimation();

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, timeLeft, tick]);

  // Feedback effect
  useEffect(() => {
    if (feedback === 'correct') {
      const timer = setTimeout(clearFeedback, 400);
      return () => clearTimeout(timer);
    } else if (feedback === 'incorrect') {
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
      const timer = setTimeout(clearFeedback, 400);
      return () => clearTimeout(timer);
    }
  }, [feedback, clearFeedback, controls]);

  return (
    <div className="w-full max-w-md bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border-4 border-white relative">
      
      {/* Header Info */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <Timer className="text-blue-500" />
          <span className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
            {timeLeft}秒
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <Trophy className="text-yellow-500" />
          <span className="text-xl font-bold text-gray-700">{score}</span>
        </div>
      </div>

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
              あんざん
              <br />
              クエスト
            </h1>
            <p className="text-gray-500 mb-8 font-bold">めざせ！けいさんマスター</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame(30)}
              className="bg-gradient-to-b from-sky-400 to-sky-500 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg border-b-4 border-sky-600 active:border-b-0 active:translate-y-1"
            >
              スタート！
            </motion.button>
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
                  className="text-orange-500 font-black text-lg flex justify-center items-center gap-1"
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

              <motion.div
                animate={
                    feedback === 'correct' ? { scale: [1, 1.1, 1] } :
                    feedback === 'incorrect' ? controls : {}
                }
                className="bg-slate-100 rounded-3xl py-10 px-4 shadow-inner border-2 border-slate-200"
              >
                <div className="flex justify-center items-center gap-2 md:gap-4 text-5xl md:text-6xl font-black text-slate-700">
                  <span>{currentProblem.expression.split(' + ')[0]}</span>
                  <span className="text-orange-400">+</span>
                  <span>{currentProblem.expression.split(' + ')[1].split(' =')[0]}</span>
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
              <Trophy size={80} className="mx-auto text-yellow-400 mb-4 drop-shadow-md" />
              <h2 className="text-3xl font-black text-gray-700 mb-2">おつかれさま！</h2>
              <p className="text-gray-500 font-bold">今回のスコア</p>
              <p className="text-6xl font-black text-sky-500 my-4">{score}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8 text-left bg-white p-4 rounded-xl shadow-sm">
              <div>
                <p className="text-xs text-gray-400 font-bold">さいだいコンボ</p>
                <p className="text-xl font-bold text-gray-700">{maxCombo}かい</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold">ランク</p>
                <p className="text-xl font-bold text-orange-500">
                  {score > 300 ? 'SS' : score > 200 ? 'S' : score > 100 ? 'A' : 'B'}
                </p>
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
