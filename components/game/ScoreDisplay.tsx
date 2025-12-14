'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  combo?: number;
}

export const ScoreDisplay = ({ score, combo = 0 }: ScoreDisplayProps) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{
        scale: 1,
        rotate: 0,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 200, damping: 15 },
        rotate: { type: 'spring', stiffness: 200, damping: 15 },
      }}
      className="relative"
    >
      <div
        className={`
          relative flex items-center gap-3 px-6 py-3 rounded-full
          ${combo >= 3 ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 shadow-lg' : 'bg-white shadow-sm'}
          border-4 border-white
        `}
      >
        <Trophy className={`${combo >= 3 ? 'text-white' : 'text-yellow-500'} relative z-10`} size={28} />

        <span className={`text-3xl font-black relative z-10 ${combo >= 3 ? 'text-white' : 'text-gray-700'}`}>
          {score}
        </span>
      </div>

      {/* Sparkles around high score */}
      {combo >= 3 && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
              className="absolute text-2xl"
              style={{
                top: i === 0 ? '-10px' : i === 1 ? 'auto' : '50%',
                bottom: i === 1 ? '-10px' : 'auto',
                left: i === 2 ? '-10px' : i === 3 ? 'auto' : '50%',
                right: i === 3 ? '-10px' : 'auto',
                transform: 'translate(-50%, -50%)',
              }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );
};
