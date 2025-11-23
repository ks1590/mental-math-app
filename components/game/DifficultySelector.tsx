'use client';

import { motion } from 'framer-motion';
import { DifficultyLevel } from '@/lib/math-engine';

interface DifficultySelectorProps {
  selectedLevel: DifficultyLevel;
  onSelectLevel: (level: DifficultyLevel) => void;
}

const levelConfig = [
  {
    level: 1 as DifficultyLevel,
    title: 'レベル1',
    description: '足し算・引き算',
    symbols: ['+', '-'],
    color: 'bg-green-400',
    hoverColor: 'hover:bg-green-300',
    borderColor: 'border-green-600',
    textColor: 'text-green-900',
  },
  {
    level: 2 as DifficultyLevel,
    title: 'レベル2',
    description: '足し算・引き算・掛け算',
    symbols: ['+', '-', '×'],
    color: 'bg-blue-400',
    hoverColor: 'hover:bg-blue-300',
    borderColor: 'border-blue-600',
    textColor: 'text-blue-900',
  },
  {
    level: 3 as DifficultyLevel,
    title: 'レベル3',
    description: '全ての計算',
    symbols: ['+', '-', '×', '÷'],
    color: 'bg-purple-400',
    hoverColor: 'hover:bg-purple-300',
    borderColor: 'border-purple-600',
    textColor: 'text-purple-900',
  },
];

export const DifficultySelector = ({ selectedLevel, onSelectLevel }: DifficultySelectorProps) => {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <p className="text-sm font-bold text-gray-600 text-center mb-4">レベルをを選んでね！</p>
      {levelConfig.map((config) => {
        const isSelected = selectedLevel === config.level;
        return (
          <motion.button
            key={config.level}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectLevel(config.level)}
            className={`
              w-full p-4 rounded-2xl border-b-4 transition-all
              ${isSelected 
                ? `${config.color} ${config.borderColor} ring-4 ring-offset-2 ring-yellow-300` 
                : `bg-white ${config.borderColor} opacity-70 ${config.hoverColor}`
              }
              active:border-b-0 active:translate-y-1
            `}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className={`font-black text-lg ${isSelected ? 'text-white' : config.textColor}`}>
                  {config.title}
                </h3>
                <p className={`text-xs font-medium ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                  {config.description}
                </p>
              </div>
              <div className="flex gap-1">
                {config.symbols.map((symbol, idx) => (
                  <span 
                    key={idx}
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center text-lg font-black
                      ${isSelected ? 'bg-white/30 text-white' : 'bg-gray-100 text-gray-400'}
                    `}
                  >
                    {symbol}
                  </span>
                ))}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
