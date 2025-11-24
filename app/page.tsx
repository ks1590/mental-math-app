import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Trophy, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mb-12 space-y-4">
        <div className="inline-block p-2 rounded-3xl shadow-xl rotate-7 mb-6">
          <Image src="/icon.svg" alt="MathPop Logo" width={120} height={120} priority />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-indigo-900 tracking-tight">
          Math<span className="text-orange-500">Pop!</span>
        </h1>
        <p className="text-xl text-indigo-600 font-medium">
          楽しく学べる暗算アプリ
        </p>
      </div>

      <div className="space-y-6 w-full max-w-xs">
        <Link href="/game" className="block">
          <Button size="xl" className="w-full shadow-xl shadow-yellow-200">
            あそぶ
          </Button>
        </Link>
        
        {/* <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 p-4 rounded-2xl backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="font-bold text-indigo-900">ランキング</div>
          </div>
          <div className="bg-white/60 p-4 rounded-2xl backdrop-blur-sm">
            <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="font-bold text-indigo-900">スピード</div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
