'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScorePopupProps {
  score: number;
  isVisible: boolean;
}

export const ScorePopup = ({ score, isVisible }: ScorePopupProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isVisible && score > 0) {
      // Generate random particles
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        delay: Math.random() * 0.1,
      }));
      setParticles(newParticles);
    }
  }, [isVisible, score]);

  return (
    <AnimatePresence>
      {isVisible && score > 0 && (
        <>
          {/* Score Pop-up */}
          <motion.div
            initial={{ scale: 0, y: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1.2],
              y: -80,
              opacity: [0, 1, 1, 0],
              rotate: [0, 5, -5, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(251, 191, 36, 0.6)',
                    '0 0 40px rgba(251, 191, 36, 0.8)',
                    '0 0 20px rgba(251, 191, 36, 0.6)',
                  ],
                }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 text-white font-black text-6xl px-8 py-4 rounded-3xl shadow-2xl border-4 border-white"
              >
                +{score}
              </motion.div>
            </div>
          </motion.div>

          {/* Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                scale: [0, 1.5, 0],
                x: particle.x,
                y: particle.y,
                opacity: [0, 1, 0],
                rotate: 360,
              }}
              transition={{
                duration: 1,
                delay: particle.delay,
                ease: 'easeOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
            >
              <div className="text-4xl">{Math.random() > 0.5 ? '⭐' : '✨'}</div>
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
};
