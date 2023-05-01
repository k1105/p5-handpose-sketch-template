import dynamic from "next/dynamic";
import p5Types from "p5";
import { MutableRefObject } from "react";
import { Hand } from "@tensorflow-models/hand-pose-detection";
import { getSmoothedHandpose } from "../lib/getSmoothedHandpose";
import { updateHandposeHistory } from "../lib/updateHandposeHistory";
import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import { convertHandToHandpose } from "../lib/converter/convertHandToHandpose";
import { dotHand } from "../lib/p5/dotHand";
import { isFront } from "../lib/calculator/isFront";

type Props = {
  handpose: MutableRefObject<Hand[]>;
};

type Handpose = Keypoint[];

const Sketch = dynamic(import("react-p5"), {
  loading: () => <></>,
  ssr: false,
});

export const HandSketch = ({ handpose }: Props) => {
  let handposeHistory: {
    left: Handpose[];
    right: Handpose[];
  } = { left: [], right: [] };

  const preload = (p5: p5Types) => {
    // 画像などのロードを行う
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.stroke(220);
    p5.fill(255);
    p5.strokeWeight(10);
  };

  const draw = (p5: p5Types) => {
    const rawHands: {
      left: Handpose;
      right: Handpose;
    } = convertHandToHandpose(handpose.current); //平滑化されていない手指の動きを使用する
    handposeHistory = updateHandposeHistory(rawHands, handposeHistory); //handposeHistoryの更新
    const hands: {
      left: Handpose;
      right: Handpose;
    } = getSmoothedHandpose(rawHands, handposeHistory); //平滑化された手指の動きを取得する

    p5.background(1, 25, 96);
    p5.push();
    p5.noStroke();
    p5.textAlign(p5.CENTER);
    p5.text(
      "Edit Me in sketch/FingerSketch.tsx !",
      p5.width / 2,
      p5.height / 2
    );
    p5.pop();
    if (hands.left.length > 0) {
      p5.push();
      // isFront(hands.left, "left") ? p5.fill(255, 0, 0) : p5.fill(0, 0, 255); //表裏判定
      p5.translate(p5.width / 2 - 300, p5.height / 2 + 50);
      dotHand({
        p5,
        hand: hands.left,
        dotSize: 10,
      });
      p5.pop();
    }
    if (hands.right.length > 0) {
      p5.push();
      p5.translate(p5.width / 2 + 300, p5.height / 2 + 50);
      dotHand({
        p5,
        hand: hands.right,
        dotSize: 10,
      });
      p5.pop();
    }
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <>
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        windowResized={windowResized}
      />
    </>
  );
};
