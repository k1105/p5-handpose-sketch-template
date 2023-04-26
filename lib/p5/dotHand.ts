import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import p5Types from "p5";

type Handpose = Keypoint[];

type Props = {
  hand: Handpose;
  p5: p5Types;
  dotSize: number;
};

export const dotHand = ({ hand, p5, dotSize }: Props) => {
  p5.push();
  p5.noStroke();
  for (let i = 0; i < 21; i++) {
    p5.ellipse(hand[i].x - hand[0].x, hand[i].y - hand[0].y, dotSize);
  }
  p5.pop();
};
