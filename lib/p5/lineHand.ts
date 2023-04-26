import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import p5Types from "p5";

type Handpose = Keypoint[];

type Props = {
  hand: Handpose;
  p5: p5Types;
  strokeWeight: number;
};

export const lineHand = ({ hand, p5, strokeWeight }: Props) => {
  p5.push();
  p5.strokeWeight(strokeWeight);
  for (let i = 0; i < 5; i++) {
    const start = i * 4 + 1;
    const end = i * 4 + 4;
    p5.line(0, 0, hand[start].x - hand[0].x, hand[start].y - hand[0].y);
    for (let j = start; j < end; j++) {
      p5.line(
        hand[j].x - hand[0].x,
        hand[j].y - hand[0].y,
        hand[j + 1].x - hand[0].x,
        hand[j + 1].y - hand[0].y
      );
    }
  }
  p5.pop();
};
