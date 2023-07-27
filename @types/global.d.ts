import { Keypoint } from "@tensorflow-models/hand-pose-detection";
declare type Handpose = Keypoint[];
declare type DevidedHandpose = {
  wrist: Keypoint;
  thumb: Keypoint[];
  index: Keypoint[];
  middle: Keypoint[];
  ring: Keypoint[];
  pinky: Keypoint[];
};
declare type DisplayHands = {
  left: Keypoint[];
  leftOpacity: number;
  right: Keypoint[];
  rightOpacity: number;
};
