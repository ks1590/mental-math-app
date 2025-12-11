import { Operation } from '@/lib/math-engine';

/**
 * 演算記号に対応する色クラスを返す
 */
export const useOperationColor = () => {
  const getOperationColor = (operation: Operation): string => {
    switch (operation) {
      case 'add':
        return 'text-orange-400';
      case 'subtract':
        return 'text-blue-400';
      case 'multiply':
        return 'text-green-400';
      case 'divide':
        return 'text-purple-400';
      default:
        return 'text-orange-400';
    }
  };

  return { getOperationColor };
};
