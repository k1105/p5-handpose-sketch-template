import p5Types from "p5";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

type SketchProps = {
  p5: p5Types;
  hands: handPoseDetection.Keypoint[][];
};

type Lost = { state: boolean; prev: boolean; at: number };
