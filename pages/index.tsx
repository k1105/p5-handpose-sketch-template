import { useCallback, useRef, useState, useEffect } from "react";
import "@tensorflow/tfjs";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import Webcam from "react-webcam";
import { HandSketch } from "../sketch/HandSketch";
import { PixelInput } from "@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces";
import Head from "next/head";

export default function App() {
  const webcamRef = useRef<Webcam>(null);
  const modelRef = useRef<null | handPoseDetection.HandDetector>(null);
  const predictionsRef = useRef<handPoseDetection.Hand[]>([]);
  const requestRef = useRef<null | number>(null);
  const [ready, setReady] = useState<boolean>(false);
  const lostCountRef = useRef(0);
  const isLost = useRef<boolean>(true);
  const sketchContainerRef = useRef<HTMLDivElement>(null);
  // const timer = 120000;

  const capture = useCallback(async () => {
    if (typeof webcamRef.current && modelRef.current) {
      //webcamとmodelのインスタンスが生成されていたら
      const predictions = await modelRef.current.estimateHands(
        (webcamRef.current as Webcam).getCanvas() as PixelInput
      ); //webcamの現時点でのフレームを取得し、ポーズ推定の結果をpredictionsに非同期で格納

      if (predictions) {
        if (
          predictions.length > 0 &&
          predictions.every((hand) => {
            return hand.score > 0.75;
          })
        ) {
          predictionsRef.current = predictions;
          lostCountRef.current = 0;
          isLost.current = false;
        } else {
          lostCountRef.current++;
        }

        if (lostCountRef.current > 5) {
          predictionsRef.current = [];
          isLost.current = true;
        }
      }
    }

    if (ready) {
      requestRef.current = requestAnimationFrame(capture); //captureを実施
    }
  }, [ready]);

  useEffect(() => {
    const load = async () => {
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig = {
        runtime: "tfjs",
        modelType: "full",
      } as handPoseDetection.MediaPipeHandsTfjsModelConfig;
      modelRef.current = await handPoseDetection.createDetector(
        model,
        detectorConfig
      );
    };

    load();

    setReady(true);
    // setInterval("location.reload()", timer);
  }, []);

  useEffect(() => {
    if (ready) {
      requestRef.current = requestAnimationFrame(capture);
    }
  }, [capture, ready]);

  return (
    <>
      <Head>
        <title>Create Handpose Sketch</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {ready && (
        <>
          <div ref={sketchContainerRef}>
            <HandSketch handpose={predictionsRef} isLost={isLost} />
          </div>
        </>
      )}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          opacity: 0, //debug -> opacity: 1
        }}
      >
        <Webcam //手指の動きを取得するのに必要なカメラ映像
          width="400"
          height="300"
          mirrored
          id="webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
    </>
  );
}
