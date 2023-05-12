import { Keypoint } from "@tensorflow-models/hand-pose-detection";

type Handpose = Keypoint[];

export const resizeHandpose = (handpose: Handpose, scale: number) => {
  const res: Keypoint[] = [];
  for (const keypoint of handpose) {
    res.push({ x: keypoint.x * scale, y: keypoint.y * scale });
  }
  return res;
};
