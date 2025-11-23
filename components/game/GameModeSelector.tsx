'use client';

import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';

type GameMode = 'normal' | 'survival';

interface GameModeSelectorProps {
  selectedMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

const modeConfig = [
  {
    mode: 'normal' as GameMode,
    title: 'タイムアタック',
    description: '30秒で何問解ける？',
    icon: Clock,
    color: 'bg-sky-400',
    hoverColor: 'hover:bg-sky-300',
    borderColor: 'border-sky-600',
    textColor: 'text-sky-900',
  },
  {
    mode: 'survival' as GameMode,
    title: 'サバイバル',
    description: '時間切れまでチャレンジ！',
    icon: Zap,
    color: 'bg-orange-400',
    hoverColor: 'hover:bg-orange-300',
    borderColor: 'border-orange-600',
    textColor: 'text-orange-900',
  },
];

export const GameModeSelector = ({ selectedMode, onSelectMode }: GameModeSelectorProps) => {
  return (
    <div className="space-y-3 w-full max-w-sm mb-14">
      <p className="text-lg font-bold text-gray-600 text-center mb-4">モードを選んでね！</p>
      <div className="grid grid-cols-2 gap-3">
        {modeConfig.map((config) => {
          const isSelected = selectedMode === config.mode;
          const Icon = config.icon;
          return (
            <motion.button
              key={config.mode}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectMode(config.mode)}
              className={`
                p-4 rounded-2xl border-b-4 transition-all
                ${isSelected 
                  ? `${config.color} ${config.borderColor} ring-4 ring-offset-2 ring-yellow-300` 
                  : `bg-white ${config.borderColor} opacity-70 ${config.hoverColor}`
                }
                active:border-b-0 active:translate-y-1
              `}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon 
                  size={32} 
                  className={isSelected ? 'text-white' : config.textColor}
                />
                <div className="text-center">
                  <h3 className={`font-black text-base ${isSelected ? 'text-white' : config.textColor}`}>
                    {config.title}
                  </h3>
                  <p className={`text-xs font-medium mt-1 ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                    {config.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
