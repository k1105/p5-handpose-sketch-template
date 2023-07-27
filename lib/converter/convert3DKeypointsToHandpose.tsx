import { Hand, Keypoint } from "@tensorflow-models/hand-pose-detection";
import { Handpose } from "../../@types/global";

export const convert3DKeypointsToHandpose = (hands: Hand[]) => {
  const shapedHands: {
    left: Handpose;
    right: Handpose;
  } = { left: [], right: [] };

  for (let index = 0; index < hands.length; index++) {
    //認識されている手の数分ループする（0~2）.
    const handpose: Handpose = [];
    for (const point of hands[index].keypoints3D as Keypoint[]) {
      handpose.push({ x: point.x, y: point.y });
    }

    if (hands[index].handedness == "Left") {
      //左手
      shapedHands.left = handpose;
    } else {
      //右手
      shapedHands.right = handpose;
    }
  }
  return shapedHands;
};
