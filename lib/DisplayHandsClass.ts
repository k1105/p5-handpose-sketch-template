import { Handpose } from "../@types/global";

export class DisplayHands {
  left: { pose: Handpose; opacity: number };
  right: { pose: Handpose; opacity: number };

  constructor() {
    this.left = {
      pose: [],
      opacity: 0,
    };
    this.right = {
      pose: [],
      opacity: 0,
    };
  }

  update = (hands: { left: Handpose; right: Handpose }) => {
    if (hands.left.length > 0) {
      this.left.pose = hands.left;
      this.left.opacity = Math.min(255, this.left.opacity + 255 / 10);
    } else {
      this.left.opacity = Math.max(0, this.left.opacity - 255 / 10);
    }

    if (hands.right.length > 0) {
      this.right.pose = hands.right;
      this.right.opacity = Math.min(255, this.right.opacity + 255 / 10);
    } else {
      this.right.opacity = Math.max(0, this.right.opacity - 255 / 10);
    }
  };
}
