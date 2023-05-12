import dynamic from "next/dynamic";
import p5Types from "p5";
import { MutableRefObject } from "react";
import { Hand } from "@tensorflow-models/hand-pose-detection";
import { getSmoothedHandpose } from "../lib/getSmoothedHandpose";
import { resizeHandpose } from "../lib/converter/resizeHandpose";
import { updateHandposeHistory } from "../lib/updateHandposeHistory";
import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import { convertHandToHandpose } from "../lib/converter/convertHandToHandpose";
import { dotHand } from "../lib/p5/dotHand";
import Webcam from "react-webcam";
import { lineHand } from "../lib/p5/lineHand";

type Props = {
  handpose: MutableRefObject<Hand[]>;
};

type Handpose = Keypoint[];

const Sketch = dynamic(import("react-p5"), {
  loading: () => <></>,
  ssr: false,
});

export const DebugSketch = ({ handpose }: Props) => {
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
    p5.clear();

    handpose.current.forEach((hand, index) => {
      p5.push();
      p5.noStroke();
      p5.textAlign(p5.LEFT);
      p5.text(
        hand.handedness + ": " + hand.score,
        p5.width - 330,
        300 + 30 * index
      );
      p5.pop();
    });

    const rawHands: {
      left: Handpose;
      right: Handpose;
    } = convertHandToHandpose(handpose.current); //平滑化されていない手指の動きを使用する
    handposeHistory = updateHandposeHistory(rawHands, handposeHistory); //handposeHistoryの更新
    const hands: {
      left: Handpose;
      right: Handpose;
    } = rawHands;

    if (hands.left.length > 0) {
      hands.left = resizeHandpose(hands.left, 3 / 4);
      p5.push();
      p5.translate(p5.width - 330 + hands.left[0].x, 30 + hands.left[0].y);
      lineHand({
        p5,
        hand: hands.left,
        strokeWeight: 5,
      });
      p5.pop();
    }
    if (hands.right.length > 0) {
      hands.right = resizeHandpose(hands.right, 3 / 4);
      p5.push();
      p5.translate(p5.width - 330 + hands.right[0].x, 30 + hands.right[0].y);
      lineHand({
        p5,
        hand: hands.right,
        strokeWeight: 5,
      });
      p5.pop();
    }
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: 99 }}>
        <Sketch
          preload={preload}
          setup={setup}
          draw={draw}
          windowResized={windowResized}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 30,
          top: 30,
          zIndex: 0,
        }}
      >
        <Webcam //手指の動きを取得するのに必要なカメラ映像
          width="300"
          height="225"
          mirrored
          id="webcam"
          audio={false}
          screenshotFormat="image/jpeg"
        />
      </div>
    </>
  );
};
