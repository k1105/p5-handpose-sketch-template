import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

export const updateHandposeHistory = (
  handpose: handPoseDetection.Hand[],
  handposeHistory: {
    left: handPoseDetection.Keypoint[][];
    right: handPoseDetection.Keypoint[][];
  }
) => {
  for (let index = 0; index < handpose.length; index++) {
    //認識されている手の数分ループする（0~2）.
    if (handpose[index].handedness == "Left") {
      handposeHistory.left.push(handpose[index].keypoints);
      if (handposeHistory.left.length > 5) {
        handposeHistory.left.shift();
      }
    } else if (handpose[index].handedness == "Right") {
      handposeHistory.right.push(handpose[index].keypoints);
      if (handposeHistory.right.length > 5) {
        handposeHistory.right.shift();
      }
    }
  }
  return handposeHistory;
};
