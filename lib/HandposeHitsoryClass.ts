import { Handpose } from "../@types/global";

export class HandposeHistory {
  left: Handpose[];
  right: Handpose[];

  constructor() {
    this.left = [];
    this.right = [];
  }

  update = (rawHands: { left: Handpose; right: Handpose }) => {
    //認識されている手の数分ループする（0~2）.
    if (rawHands.left.length > 0) {
      this.left.push(rawHands.left);
      if (this.left.length > 5) {
        this.left.shift();
      }
    }
    if (rawHands.right.length > 0) {
      this.right.push(rawHands.right);
      if (this.right.length > 5) {
        this.right.shift();
      }
    }
  };
}
