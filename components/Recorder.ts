import { MutableRefObject } from "react";
import { Handpose } from "../@types/global";

export const Recorder = (
  isLost: boolean,
  recordedDataRef: MutableRefObject<{ left: number[]; right: number[] }[]>,
  archiveRef: MutableRefObject<{ left: number[]; right: number[] }[]>,
  hands: { left: Handpose; right: Handpose },
  download: boolean
) => {
  if (isLost) {
    if (recordedDataRef.current.length > 300) {
      //記録の終了
      if (download) {
        const content = JSON.stringify(recordedDataRef.current);
        const blob = new Blob([content], { type: "text/plain" });
        const objUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objUrl;
        link.download = String(Date.now()) + ".json";
        link.click();
      }
      archiveRef.current = recordedDataRef.current;
      recordedDataRef.current = [];
    }
  } else {
    const leftKeypoints = [];
    for (const keypoint of hands.left) {
      leftKeypoints.push(keypoint.x, keypoint.y);
    }
    const rightKeypoints = [];
    for (const keypoint of hands.right) {
      rightKeypoints.push(keypoint.x, keypoint.y);
    }
    recordedDataRef.current.push({
      left: leftKeypoints,
      right: rightKeypoints,
    });
  }
};
