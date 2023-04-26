import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import { calcAverageKeypoints } from "./calculator/calcAverageKeypoints";

type Handpose = Keypoint[];

export const getSmoothedHandpose = (
  rawHands: {
    left: Handpose;
    right: Handpose;
  },
  keyframes: {
    left: Handpose[];
    right: Handpose[];
  }
) => {
  const hands: {
    left: Handpose;
    right: Handpose;
  } = { left: [], right: [] };
  if (rawHands.left.length > 0) {
    //左手
    hands.left = calcAverageKeypoints(keyframes.left);
  }
  if (rawHands.right.length > 0) {
    //右手
    hands.right = calcAverageKeypoints(keyframes.right);
  }

  return hands;
};
