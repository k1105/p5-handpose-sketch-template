## Overview

p5.js で tensorflow が提供する[hand-pose-detection](https://blog.tensorflow.org/2021/11/3D-handpose.html)モデルを使用できるよう作成したフレームワーク.プロジェクトファイル内に存在する sketch ファイルを編集することで容易に手指の動きを用いたインタラクティブなクリエイティブコーディングが可能なほか, 生のデータを平滑化した滑らかな手指の動きなどを使用できる関数群を提供する. <br/>
[Try out the live DEMO!](https://p5-handpose-sketch-template.vercel.app/)

![keyshot](img/keyshot.png)

## Getting Started

本フレームワークの動作には node.js が必要です。Next.js のインストール手順は <br/>
Mac: [Mac に Node.js をインストール](https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09)　<br/>
Windows: [Node.js をインストールする](https://qiita.com/sefoo0104/items/0653c935ea4a4db9dc2b)

1. github のリポジトリから最新版のプロジェクトをダウンロードする.安定版は releases 一覧から最新のものを選択, 最新のものは「Code > Download ZIP」を選択. ダウンロード後, zip ファイルを展開する.

releases から安定版をダウンロード:<br/>
　　<img src="img/release.png" width="50%">

Code > Download ZIP から最新版をダウンロード:<br/>
<img src="img/download-zip.png" width="50%">

2. ターミナル（コマンドプロンプト）でダウンロードしてきたディレクトリに移動し,以下を実行.

```bash
npm install
# or
yarn install
```

### 実行について

同じくダウンロードしてきたディレクトリ内で, 以下を実行.

```bash
npm run dev
# or
yarn dev
```

[http://localhost:3000](http://localhost:3000)にて実行結果を確認.

### 編集について

カンバス内を編集していく場合は, `sketch/HandSketch.tsx`を編集する.<br/>
[p5.js](https://p5js.org/)で記述できるが, p5 の関数や p5 特有の変数（カンバスサイズを有する width, height 変数や, textAlign を指定する際の CENTER といったオプションなど）を使用する際は, その先頭に`p5`をつける必要があることに注意.

## Handpose landmarks

手指の各特徴点については次のような番号が割り当てられている. <br/>
（[MediaPipe のドキュメント](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker)から転載.）

![hand-landmarks](https://developers.google.com/static/mediapipe/images/solutions/hand-landmarks.png)

例えば人差し指の動きだけを取得したい場合は、番号 5~8 の特徴点を取得する.

## 型について

本テンプレートは p5js での描画に特化したテンプレートであるため、手指の情報については、① 保持する情報を描画に必要なキーポイントの情報のみに限定し、② 右手と左手が区別された手指の姿勢を直接呼び出すことが可能な型定義を独自に行なった。独自に行なった型`Handpose`, 並びに`DevidedHandpose`は以下のようになっている。

```tsx
type Handpose = handPoseDetection.Keypoint[];
type DevidedHandpose = {
  wrist: Keypoint;
  thumb: Keypoint[];
  index: Keypoint[];
  middle: Keypoint[];
  ring: Keypoint[];
  pinky: Keypoint[];
};
```

## 関数について

描画に関連する関数は次のとおり：

### convertHandToHandpose

```typescript
const convertHandToHandpose: (hands: handPoseDetection.Hand[]) => {
  left: Handpose;
  right: Handpose;
};
```

- tensorflow によって取得された手指の動きを, 左手, 右手といった形で呼び出せるよう整形された形式で取得できる関数. 引数に tensorflow から取得してきた手指の姿勢情報をそのまま入力する.

### getSmoothedHandpose

```typescript
const getSmoothedHandpose: (
  rawHands{
  left: Handpose;
  right: Handpose;
},
  keyframes: {
    left: Handpose[];
    right: Handpose[];
  }
) => Handposes;
```

- 手指の動きを, 前後 5 フレーム分の情報を用いて平滑化したものを取得できる関数.tensorflow から取得してきた手指の姿勢情報に加え, これまでの姿勢情報を持つ `handposeHistory` を渡す必要がある.また, `handposeHistory` を使用するためには`updateHandposeHistory()`関数を用いて毎フレーム`handposeHistory`を更新する必要がある.

他の関数についての説明は[Docs](https://ripple-shock-17d.notion.site/99222f8ac8f0478b89e1c4bdbc814930?v=2be059aa50cd47cdbd854bc224d707ce)を参照。

## 構成

`index.tsx`上で Detector を作成（非同期）し, 作成完了と同時に sketch ファイルが読み込まれる. 手指の姿勢推定を行う処理が記述されているのも同じく`index.tsx`であり, 更新されるたびに`predictionsRef`に新規の姿勢が格納される. `sketch/HandSketch.tsx`ではこの値を毎フレーム読みにいき, 読み込まれた最新の姿勢情報を用いて描画処理を行う.

![timeline-diagram](img/timeline-diagram.png)

注意事項としては,

- `index.tsx`での`predictionsRef`の更新と`HandSketch.tsx`での`predictionsRef`の読み出しは独立した処理であるため, 更新がされる前に何度も呼び出される, また逆に, 呼び出されることなく新しい姿勢情報に更新される, といったことが起こる可能性がある.
- `predictionsRef.current`の戻り値は空配列になることがあるため, 描画の際は空配列を受け取った場合の処理について記述しておく必要がある.

### Docs

[notion](https://ripple-shock-17d.notion.site/99222f8ac8f0478b89e1c4bdbc814930?v=2be059aa50cd47cdbd854bc224d707ce)
