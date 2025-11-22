'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface FeedbackProps {
  type: 'correct' | 'incorrect' | null;
}

export const Feedback = ({ type }: FeedbackProps) => {
  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ opacity: 0, scale: 1.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
        >
          {type === 'correct' ? (
            <div className="bg-green-500/20 p-12 rounded-full backdrop-blur-sm">
              <Check className="w-32 h-32 text-green-500 stroke-[4]" />
            </div>
          ) : (
            <div className="bg-red-500/20 p-12 rounded-full backdrop-blur-sm">
              <X className="w-32 h-32 text-red-500 stroke-[4]" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
