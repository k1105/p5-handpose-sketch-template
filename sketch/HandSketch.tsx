import dynamic from "next/dynamic";
import p5Types from "p5";
import { MutableRefObject, useRef } from "react";
import { Hand } from "@tensorflow-models/hand-pose-detection";
import { getSmoothedHandpose } from "../lib/getSmoothedHandpose";
import { updateHandposeHistory } from "../lib/updateHandposeHistory";
import { convertHandToHandpose } from "../lib/converter/convertHandToHandpose";
import { dotHand } from "../lib/p5/dotHand";
import { isFront } from "../lib/calculator/isFront";
import { Monitor } from "../components/Monitor";
import { Recorder } from "../components/Recorder";
import { Handpose, DisplayHands } from "../@types/global";
import { updateDisplayHands } from "../lib/calculator/updateDisplayHands";

type Props = {
  handpose: MutableRefObject<Hand[]>;
};

let displayHands: DisplayHands = {
  left: [],
  leftOpacity: 0,
  right: [],
  rightOpacity: 0,
};

const Sketch = dynamic(import("react-p5"), {
  loading: () => <></>,
  ssr: false,
});

export const HandSketch = ({ handpose }: Props) => {
  let handposeHistory: {
    left: Handpose[];
    right: Handpose[];
  } = { left: [], right: [] };

  const debugLog = useRef<{ label: string; value: any }[]>([]);

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
    } = convertHandToHandpose(handpose.current);
    handposeHistory = updateHandposeHistory(rawHands, handposeHistory); //handposeHistoryの更新
    const hands: {
      left: Handpose;
      right: Handpose;
    } = getSmoothedHandpose(rawHands, handposeHistory); //平滑化された手指の動きを取得する

    // logとしてmonitorに表示する
    debugLog.current = [];
    for (const hand of handpose.current) {
      debugLog.current.push({
        label: hand.handedness + " accuracy",
        value: hand.score,
      });
      debugLog.current.push({
        label: hand.handedness + " is front",
        //@ts-ignore
        value: isFront(hand.keypoints, hand.handedness.toLowerCase()),
      });
    }

    p5.clear();
    p5.push();
    p5.noStroke();
    p5.textAlign(p5.CENTER);
    p5.text(
      "Edit Me in sketch/FingerSketch.tsx !",
      p5.width / 2,
      p5.height / 2
    );
    p5.pop();

    displayHands = updateDisplayHands({ hands, displayHands });

    if (displayHands.left.length > 0) {
      p5.push();
      p5.fill(255, displayHands.leftOpacity);
      p5.translate(p5.width / 2 - 300, p5.height / 2 + 50);
      dotHand({
        p5,
        hand: displayHands.left,
        dotSize: 10,
      });
      p5.pop();
    }

    if (displayHands.right.length > 0) {
      p5.push();
      p5.fill(255, displayHands.rightOpacity);
      p5.translate(p5.width / 2 + 300, p5.height / 2 + 50);
      dotHand({
        p5,
        hand: displayHands.right,
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
      <Monitor handpose={handpose} debugLog={debugLog} />
      <Recorder handpose={handpose} />
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        windowResized={windowResized}
      />
    </>
  );
};
