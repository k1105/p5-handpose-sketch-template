import dynamic from "next/dynamic";
import p5Types from "p5";
import { MutableRefObject, useState } from "react";
import { Hand } from "@tensorflow-models/hand-pose-detection";
import { convertHandToHandpose } from "../lib/converter/convertHandToHandpose";
import { Handpose } from "../@types/global";

type Props = {
  handpose: MutableRefObject<Hand[]>;
};

const Sketch = dynamic(import("react-p5"), {
  loading: () => <></>,
  ssr: false,
});

export const Recorder = ({ handpose }: Props) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recordedHandposes: {
    left: Handpose;
    right: Handpose;
  }[] = []; //stateの変更に伴ってリセットされる

  const setup = (p5: p5Types, canvasParentRef: Element) => {};

  const draw = (p5: p5Types) => {
    const rawHands: {
      left: Handpose;
      right: Handpose;
    } = convertHandToHandpose(handpose.current); //平滑化されていない手指の動きを使用する
    recordedHandposes.push(rawHands);
  };

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: 99 }}>
        <button
          onClick={() => {
            if (isRecording) {
              //記録の終了
              console.log(JSON.stringify(recordedHandposes));
            }
            setIsRecording(!isRecording);
          }}
          style={{
            position: "absolute",
            top: "80px",
            left: "30px",
            width: "100px",
            height: "30px",
            background: !isRecording ? "rgba(0,0,0,0)" : "#fff",
            border: "1px solid #ffffff",
            color: isRecording ? "#011960" : "#fff",
            borderRadius: "5px",
          }}
        >
          {!isRecording ? "Begin Record" : "End Record"}
        </button>

        {isRecording ? <Sketch setup={setup} draw={draw} /> : <></>}
      </div>
    </>
  );
};
