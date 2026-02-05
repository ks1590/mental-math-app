import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks';
import { useGameStore } from '@/store/useGameStore';

interface GameCountdownProps {
  status: 'idle' | 'countdown' | 'playing' | 'finished';
}

export const GameCountdown = ({ status }: GameCountdownProps) => {
  const { countdown } = useCountdown({
    status,
    onComplete: () => useGameStore.setState({ status: 'playing' }),
  });

  return (
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
          <span className="text-9xl font-black text-sky-500 drop-shadow-lg">{countdown}</span>
        ) : (
          <span className="text-7xl font-black text-yellow-400 drop-shadow-lg">GO!</span>
        )}
      </motion.div>
      <p className="text-gray-500 font-bold text-lg">準備はいいかな？</p>
    </motion.div>
  );
};
