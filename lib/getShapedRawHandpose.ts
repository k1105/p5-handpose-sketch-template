import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

export const getShapedRawHandpose = (rawHands: handPoseDetection.Hand[]) => {
  const hands: {
    left: handPoseDetection.Keypoint[];
    right: handPoseDetection.Keypoint[];
  } = { left: [], right: [] };
  for (let index = 0; index < rawHands.length; index++) {
    //認識されている手の数分ループする（0~2）.
    if (rawHands[index].handedness == "Left") {
      //左手
      hands.left = rawHands[index].keypoints;
    } else {
      //右手
      hands.right = rawHands[index].keypoints;
    }
  }
  return hands;
};
