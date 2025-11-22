import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Calculator, Trophy, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-12 space-y-4">
        <div className="inline-block p-4 bg-white rounded-3xl shadow-xl rotate-3 mb-6">
          <Calculator className="w-20 h-20 text-indigo-500" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-indigo-900 tracking-tight">
          Math<span className="text-orange-500">Pop!</span>
        </h1>
        <p className="text-xl text-indigo-600 font-medium">
          Fun Mental Math for Kids
        </p>
      </div>

      <div className="space-y-6 w-full max-w-xs">
        <Link href="/game" className="block">
          <Button size="xl" className="w-full shadow-xl shadow-yellow-200">
            PLAY NOW
          </Button>
        </Link>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 p-4 rounded-2xl backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="font-bold text-indigo-900">Ranks</div>
          </div>
          <div className="bg-white/60 p-4 rounded-2xl backdrop-blur-sm">
            <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="font-bold text-indigo-900">Speed</div>
          </div>
        </div>
      </div>
    </main>
  );
}
