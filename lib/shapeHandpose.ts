import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

export const shapeHandpose = (hands: handPoseDetection.Hand[]) => {
  const shapedHands: {
    left: handPoseDetection.Keypoint[];
    right: handPoseDetection.Keypoint[];
  } = { left: [], right: [] };
  for (let index = 0; index < hands.length; index++) {
    //認識されている手の数分ループする（0~2）.
    if (hands[index].handedness == "Left") {
      //左手
      shapedHands.left = hands[index].keypoints;
    } else {
      //右手
      shapedHands.right = hands[index].keypoints;
    }
  }
  return shapedHands;
};
