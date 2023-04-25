import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import { calcAverageKeypoints } from "./calcAverageKeypoints";

type Hand = Keypoint[];
type Hands = {
  left: Hand;
  right: Hand;
};

export const getSmoothedHandpose = (
  rawHands: Hands,
  keyframes: {
    left: Hand[];
    right: Hand[];
  }
) => {
  const hands: Hands = { left: [], right: [] };
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
