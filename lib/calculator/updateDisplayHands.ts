import { Handpose, DisplayHands } from "../../@types/global";

type Props = {
  hands: {
    left: Handpose;
    right: Handpose;
  };
  displayHands: DisplayHands;
};

export const updateDisplayHands = ({ hands, displayHands }: Props) => {
  if (hands.left.length > 0) {
    displayHands.left = hands.left;
    displayHands.leftOpacity = Math.min(
      255,
      displayHands.leftOpacity + 255 / 10
    );
  } else {
    displayHands.leftOpacity = Math.max(0, displayHands.leftOpacity - 255 / 10);
  }

  if (hands.right.length > 0) {
    displayHands.right = hands.right;
    displayHands.rightOpacity = Math.min(
      255,
      displayHands.rightOpacity + 255 / 10
    );
  } else {
    displayHands.rightOpacity = Math.max(
      0,
      displayHands.rightOpacity - 255 / 10
    );
  }

  return displayHands;
};
