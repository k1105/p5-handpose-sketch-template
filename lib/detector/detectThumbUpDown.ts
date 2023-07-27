import { Keypoint } from "@tensorflow-models/hand-pose-detection";

const dist = (p0: Keypoint, p1: Keypoint) => {
  return Math.sqrt((p0.x - p1.x) ** 2 + (p0.y - p1.y) ** 2);
};

export const detectThumbUpDown = (hand: Keypoint[]) => {
  if (
    dist(hand[0], hand[8]) < dist(hand[0], hand[6]) &&
    dist(hand[0], hand[12]) < dist(hand[0], hand[10]) &&
    dist(hand[0], hand[16]) < dist(hand[0], hand[14]) &&
    dist(hand[0], hand[20]) < dist(hand[0], hand[18]) &&
    Math.acos(
      ((hand[4].x - hand[2].x) * (hand[6].x - hand[2].x) +
        (hand[4].y - hand[2].y) * (hand[6].y - hand[2].y)) /
        (dist(hand[2], hand[4]) * dist(hand[2], hand[6]))
    ) >
      Math.PI / 3
  ) {
    if (hand[4].y - hand[0].y > 80) {
      //thumb up
      return "down";
    } else if (hand[4].y - hand[0].y < -80) {
      //thumb down
      return "up";
    }
  }
  return null;
};
