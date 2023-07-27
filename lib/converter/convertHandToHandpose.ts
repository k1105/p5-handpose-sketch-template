import { Hand } from "@tensorflow-models/hand-pose-detection";
import { Handpose } from "../../@types/global";

export const convertHandToHandpose = (hands: Hand[]) => {
  const shapedHands: {
    left: Handpose;
    right: Handpose;
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
