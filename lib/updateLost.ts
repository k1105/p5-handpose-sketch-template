import { Hand } from "@tensorflow-models/hand-pose-detection";

export const updateLost = (
  rawHands: Hand[],
  lost: { state: boolean; prev: boolean; at: number }
) => {
  lost.prev = lost.state;
  if (rawHands.length === 0) {
    //トラックされていない・トラックがロストした場合の処理
    if (!lost.state) {
      //現在のstateがlostではなかった場合
      lost.state = true;
      lost.at = new Date().getTime();
    }
  } else {
    //手指の動きが認識された場合
    lost.state = false;
  }

  return lost;
};
