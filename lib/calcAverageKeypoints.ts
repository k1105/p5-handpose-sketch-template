import { Keypoint } from "@tensorflow-models/hand-pose-detection";

export const calcAverageKeypoints = (keyarr: Keypoint[][]) => {
  const keys: Keypoint[] = [];
  if (keyarr.length > 0) {
    for (let i = 0; i < 21; i++) {
      let totalWeight = 0;
      let val = { x: 0, y: 0 };
      for (let j = 0; j < keyarr.length; j++) {
        const weight =
          (keyarr.length - 1) / 2 - Math.abs((keyarr.length - 1) / 2 - j) + 1;
        totalWeight += weight;
        val.x += keyarr[j][i].x * weight;
        val.y += keyarr[j][i].y * weight;
      }
      keys.push({ x: val.x / totalWeight, y: val.y / totalWeight });
    }

    return keys;
  } else {
    return [];
  }
};
