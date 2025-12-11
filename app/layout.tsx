import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Mochiy_Pop_One } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const mochiyPopOne = Mochiy_Pop_One({
  weight: '400',
  variable: '--font-mochiy-pop-one',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#fb923c',
};

export const metadata: Metadata = {
  title: 'MathPop! - 楽しく学べる暗算アプリ',
  description: '小学生向けの楽しい暗算学習アプリ',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MathPop!',
  },
  icons: [
    { rel: 'icon', url: '/icon.svg' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} ${mochiyPopOne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
