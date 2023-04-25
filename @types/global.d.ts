import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
declare type Hand = handPoseDetection.Keypoint[];
declare type Hands = {
  left: Hand;
  right: Hand;
};
