import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { calcAverageKeypoints } from "./calcAverageKeypoints";

export const getSmoothedHandpose = (
  rawHands: handPoseDetection.Hand[],
  keyframes: {
    left: handPoseDetection.Keypoint[][];
    right: handPoseDetection.Keypoint[][];
  }
) => {
  const hands: {
    left: handPoseDetection.Keypoint[];
    right: handPoseDetection.Keypoint[];
  } = { left: [], right: [] };
  for (let index = 0; index < rawHands.length; index++) {
    //認識されている手の数分ループする（0~2）.
    if (rawHands[index].handedness == "Left") {
      //左手
      hands.left = calcAverageKeypoints(keyframes.left);
    } else {
      //右手
      hands.right = calcAverageKeypoints(keyframes.right);
    }
  }
  return hands;
};
