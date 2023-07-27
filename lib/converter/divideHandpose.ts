import { Handpose, DevidedHandpose } from "../../@types/global";

export const divideHandpose = (handpose: Handpose) => {
  let res: DevidedHandpose = {
    wrist: handpose[0],
    thumb: [handpose[1], handpose[2], handpose[3], handpose[4]],
    index: [handpose[5], handpose[6], handpose[7], handpose[8]],
    middle: [handpose[9], handpose[10], handpose[11], handpose[12]],
    ring: [handpose[13], handpose[14], handpose[15], handpose[16]],
    pinky: [handpose[17], handpose[18], handpose[19], handpose[20]],
  };

  return res;
};
