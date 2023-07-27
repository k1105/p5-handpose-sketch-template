import { Keypoint } from "@tensorflow-models/hand-pose-detection";

export const isFront = (handpose: Keypoint[], handness: "left" | "right") => {
  // handposeのkeypoint, 0, 5, 13番を結ぶ３角形の直交ベクトルを求め、z軸方向の成分についての符号判定から表裏を特定する.
  // 表だったらtrue, 裏だったらfalseを返す.
  const a = handpose[5];
  const b = {
    x: handpose[13].x - handpose[5].x,
    y: handpose[13].y - handpose[5].y,
  };

  if (a.x * b.y - a.y * b.x > 0) {
    return handness == "left" ? true : false;
  } else {
    return handness == "left" ? false : true;
  }
};
