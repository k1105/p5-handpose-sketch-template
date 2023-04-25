import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
declare type Handpose = handPoseDetection.Keypoint[];
declare type Handposes = {
  left: Handpose;
  right: Handpose;
};
