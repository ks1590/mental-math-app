'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameCanvas } from '@/components/game/GameCanvas';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft, Star, Heart } from 'lucide-react';

export default function GamePage() {
  const { resetGame } = useGameStore();

  useEffect(() => {
    // Reset on unmount
    return () => resetGame();
  }, [resetGame]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-50 font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 text-yellow-400 animate-pulse">
          <Star size={48} />
        </div>
        <div className="absolute bottom-20 right-10 text-orange-400 animate-bounce">
          <Heart size={32} />
        </div>
        <div className="absolute top-1/3 right-20 text-sky-300 animate-pulse delay-700">
          <Star size={24} />
        </div>
        <div className="absolute bottom-1/3 left-20 text-pink-300 animate-bounce delay-1000">
          <Heart size={40} />
        </div>
      </div>

      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 flex items-center bg-white/80 backdrop-blur-sm border-white/50"
          >
            <ArrowLeft size={16} />
            もどる
          </Button>
        </Link>
      </div>

      <GameCanvas />
    </main>
  );
}
