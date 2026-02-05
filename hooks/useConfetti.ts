import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const useConfetti = (shouldFire: boolean) => {
  useEffect(() => {
    if (shouldFire) {
      const duration = 3500;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Standard confetti
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });

        // Emoji confetti
        const scalar = 4;
        const emojis = ['🎉', '🎊', '⭐'];
        const shapes = emojis.map((emoji) => confetti.shapeFromText({ text: emoji, scalar }));

        confetti({
          ...defaults,
          particleCount: particleCount * 0.4,
          scalar,
          shapes: shapes,
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [shouldFire]);
};
