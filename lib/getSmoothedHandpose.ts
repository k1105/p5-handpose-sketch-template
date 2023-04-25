import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import { calcAverageKeypoints } from "./calcAverageKeypoints";

type Handpose = Keypoint[];
type Handposes = {
  left: Handpose;
  right: Handpose;
};

export const getSmoothedHandpose = (
  rawHands: Handposes,
  keyframes: {
    left: Handpose[];
    right: Handpose[];
  }
) => {
  const hands: Handposes = { left: [], right: [] };
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
