import { Keypoint } from "@tensorflow-models/hand-pose-detection";

type Handpose = Keypoint[];

export const updateHandposeHistory = (
  rawHands: {
    left: Handpose;
    right: Handpose;
  },
  handposeHistory: {
    left: Handpose[];
    right: Handpose[];
  }
) => {
  //認識されている手の数分ループする（0~2）.
  if (rawHands.left.length > 0) {
    handposeHistory.left.push(rawHands.left);
    if (handposeHistory.left.length > 5) {
      handposeHistory.left.shift();
    }
  }
  if (rawHands.right.length > 0) {
    handposeHistory.right.push(rawHands.right);
    if (handposeHistory.right.length > 5) {
      handposeHistory.right.shift();
    }
  }

  return handposeHistory;
};
