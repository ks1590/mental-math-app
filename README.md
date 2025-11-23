# MathPop! 🎮✨

小学生向けの楽しい暗算学習アプリ

![Next.js](https://img.shields.io/badge/Next.js-15.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0--alpha-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## 📖 概要

**MathPop!** は、小学生が楽しく暗算を学べるゲーム形式のWebアプリケーションです。ゲーミフィケーション要素を取り入れ、子どもたちが自然と計算力を身につけられるよう設計されています。

### 🎯 主な特徴

- 🎨 **カラフルで親しみやすいUI** - 子どもが夢中になるポップなデザイン
- 📱 **PWA対応** - スマホにインストールしてアプリのように使える
- 🎮 **2つのゲームモード** - タイムアタックとサバイバル
- 📊 **4段階の難易度** - レベル0（足し算のみ）からレベル3（四則演算）まで
- ⚡ **スムーズなアニメーション** - Framer Motionによる気持ちいい動き
- 🌈 **色覚多様性への配慮** - 誰もが使いやすい配色

---

## 🎮 機能

### ゲームモード

#### 🏃 タイムアタックモード
- **制限時間**: 30秒
- **目標**: 制限時間内にできるだけ多くの問題を解く
- **スコアリング**: 基本点 + コンボボーナス

#### 🔥 サバイバルモード
- **初期時間**: 10秒
- **時間回復**: 正解するたびに+3秒（最大30秒）
- **難易度上昇**: 解答数に応じてカウントダウン速度が加速
  - 10問以上: 1.2倍速
  - 20問以上: 1.5倍速
  - 30問以上: 2.0倍速
- **エンドレス**: 時間切れまで挑戦し続ける

### 難易度レベル

| レベル | 演算 | 対象学年 |
|--------|------|---------|
| **レベル0** 🟢 | 足し算のみ | 小学1年生〜 |
| **レベル1** 🔵 | 足し算・引き算 | 小学2年生〜 |
| **レベル2** 💙 | 足し算・引き算・掛け算 | 小学3年生〜 |
| **レベル3** 🔷 | すべての演算 | 小学4年生〜 |

### 問題生成

- **足し算**: 1桁 + 1桁（結果: 2〜18）
- **引き算**: 10〜18 - 1〜9（結果: 1〜17、常に正の数）
- **掛け算**: 1〜9 × 1〜9（九九の範囲）
- **割り算**: 割り切れる問題のみ（小数なし）

### UI/UX機能

- ✨ **3-2-1カウントダウン** - ゲーム開始前のワクワク演出
- 🎵 **コンボシステム** - 連続正解でボーナス得点
- 🎨 **演算記号の色分け** - 一目で計算の種類がわかる
- 📊 **リアルタイムスタッツ** - スコア、コンボ、残り時間を常に表示
- 🏆 **結果画面** - スコア、最大コンボ、ランク/クリア数を表示

---

## 🛠️ 技術スタック

### フロントエンド
- **[Next.js 15](https://nextjs.org/)** - Reactフレームワーク
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全な開発
- **[Tailwind CSS v4 (alpha)](https://tailwindcss.com/)** - ユーティリティファーストCSS
- **[Framer Motion](https://www.framer.com/motion/)** - アニメーションライブラリ

### 状態管理・ユーティリティ
- **[Zustand](https://zustand-demo.pmnd.rs/)** - 軽量な状態管理
- **[clsx](https://github.com/lukeed/clsx)** - クラス名管理
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Tailwindクラスのマージ
- **[Lucide React](https://lucide.dev/)** - アイコンライブラリ

### PWA
- Web App Manifest
- Service Worker対応
- アプリアイコン生成

---

## 🚀 環境構築

### 必要な環境

- **Node.js**: 20.x以上
- **npm**: 10.x以上

### インストール手順

1. **リポジトリをクローン**
   ```bash
   git clone <repository-url>
   cd mental-math-app
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

4. **ブラウザでアクセス**
   ```
   http://localhost:3000
   ```

### 利用可能なコマンド

```bash
# 開発サーバーを起動
npm run dev

# 本番用ビルドを作成
npm run build

# 本番サーバーを起動
npm run start

# ESLintで静的解析
npm run lint
```

---

## 📁 プロジェクト構造

```
mental-math-app/
├── app/                      # Next.js App Router
│   ├── game/                # ゲーム画面
│   │   └── page.tsx
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # トップページ
│   └── icon.svg             # アプリアイコン
├── components/              # Reactコンポーネント
│   ├── game/               # ゲーム関連コンポーネント
│   │   ├── DifficultySelector.tsx  # 難易度選択
│   │   ├── Feedback.tsx            # フィードバック表示
│   │   ├── GameCanvas.tsx          # メインゲーム画面
│   │   └── GameModeSelector.tsx    # モード選択
│   └── ui/                 # UIコンポーネント
│       └── Button.tsx
├── lib/                     # ユーティリティ
│   └── math-engine.ts      # 問題生成エンジン
├── store/                   # 状態管理
│   └── useGameStore.ts     # Zustandストア
├── public/                  # 静的ファイル
│   ├── manifest.json       # PWAマニフェスト
│   ├── icon-192.png        # アプリアイコン
│   ├── icon-512.png
│   └── apple-touch-icon.png
├── postcss.config.mjs      # PostCSS設定
├── tsconfig.json           # TypeScript設定
└── package.json            # 依存関係
```

---

## 🎨 デザインシステム

### カラーパレット

#### レベル別の色
- **レベル0**: Emerald（エメラルド）- 明るく親しみやすい
- **レベル1**: Cyan（シアン）- 青緑系
- **レベル2**: Blue（ブルー）- 落ち着きと集中
- **レベル3**: Indigo（インディゴ）- 深い青紫

#### モード別の色
- **タイムアタック**: Sky（スカイ）- 爽やかな青
- **サバイバル**: Orange（オレンジ）- エキサイティング

### アニメーション

- **カウントダウン**: 回転 + スケール（Spring）
- **コンボ**: スケール + バウンス
- **ボタン**: ホバー・タップ時の拡大縮小
- **画面遷移**: フェード + スライド

---

## 📱 PWA機能

### インストール方法

#### Android（Chrome）
1. ブラウザでアプリを開く
2. メニューから「ホーム画面に追加」を選択
3. アプリ名を確認して「追加」

#### iOS（Safari）
1. Safariでアプリを開く
2. 共有ボタンをタップ
3. 「ホーム画面に追加」を選択
4. アプリ名を確認して「追加」

### PWA仕様
- **Manifest**: アプリ名、アイコン、テーマカラーを定義
- **Viewport**: モバイル最適化設定
- **Icons**: 192px、512px、180px（Apple用）

---

## 🧪 開発ガイド

### 新しい演算を追加する

[`lib/math-engine.ts`](file:///Users/suzuki_kensuke/work_space/mental-math-app/lib/math-engine.ts)で`generateByOperation`関数を拡張：

```typescript
case 'new_operation':
  // 問題生成ロジック
  a = ...;
  b = ...;
  answer = ...;
  break;
```

### 新しい難易度レベルを追加する

1. `DifficultyLevel`型を更新
2. `getOperationsForLevel`関数に新しいケースを追加
3. `DifficultySelector.tsx`の`levelConfig`に設定を追加

### スタイルのカスタマイズ

Tailwind CSS v4のユーティリティクラスを使用：

```tsx
<div className="bg-sky-400 hover:bg-sky-300 rounded-2xl">
  {/* コンテンツ */}
</div>
```

---

## 🤝 コントリビューション

プルリクエストは歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

### 開発フロー

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

---

## 📄 ライセンス

MIT License

---

## 👥 Authors

- あなたの名前 - [@your-twitter](https://twitter.com/your-twitter)

---

## 🙏 謝辞

- デザインインスピレーション: 子ども向け学習アプリのベストプラクティス
- アイコン: [Lucide Icons](https://lucide.dev/)
- フォント: [Google Fonts](https://fonts.google.com/) - Geist Sans & Geist Mono

---

## 📝 更新履歴

### v1.0.0 (2025-11-23)
- ✨ 初回リリース
- 🎮 2つのゲームモード（タイムアタック・サバイバル）
- 📊 4段階の難易度レベル
- 🧮 四則演算対応
- 📱 PWA対応
- 🎨 アクセシブルな配色

---

**楽しく学べる暗算の世界へようこそ！** 🎉
