import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import { Handpose } from "../@types/global";

type Props = {
  indices: number[];
  originId: number;
  rotation?: number;
  position?: Keypoint;
  name?: string;
};

export class SubHandpose {
  indices: number[];
  originId: number;
  rotation: number;
  position: Keypoint;
  name: string;
  constructor({
    indices,
    originId,
    rotation = 0,
    position = { x: 0, y: 0 },
    name = "noname",
  }: Props) {
    this.indices = indices;
    this.rotation = rotation;
    this.position = position;
    this.originId = originId;
    this.name = name;
  }

  getKeypoints(handpose: Handpose) {
    const res: Keypoint[] = [];
    for (const id of this.indices) {
      res.push({
        x: handpose[id].x - handpose[this.originId].x,
        y: handpose[id].y - handpose[this.originId].y,
      });
    }

    return res;
  }
}
