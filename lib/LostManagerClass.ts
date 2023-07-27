import { Hand } from "@tensorflow-models/hand-pose-detection";

export class LostManager {
  state: boolean;
  prev: boolean;
  at: number;
  constructor() {
    this.state = false;
    this.prev = false;
    this.at = 0;
  }

  update(rawHands: Hand[]) {
    {
      this.prev = this.state;
      if (rawHands.length === 0) {
        //トラックされていない・トラックがロストした場合の処理
        if (!this.state) {
          //現在のstateがthisではなかった場合
          this.state = true;
          this.at = new Date().getTime();
        }
      } else {
        //手指の動きが認識された場合
        this.state = false;
      }
    }
  }
}
