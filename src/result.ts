import * as THREE from "three";
import { camera, cameraPosNormal, rootClock, setGameState } from "./main";
import {
  makeAppearPlayingUi,
  makeAppearResultUi,
  makeDisappearPlayingUi,
  makeDisappearResultUi,
  resetScore,
  setScoreText,
} from "./ui";
import { charaPos } from "./chara";
import { clamp } from "three/src/math/MathUtils.js";
import { easeOutSine } from "./utils";
import { countDown } from "./countdown";

let resultShowTime = 0;
let retryClickTime = 0;
const cameraMoveTime = 0.8;

const cameraPosResult = new THREE.Vector3(charaPos - 4, 0, 6);

export const result = () => {
  makeDisappearPlayingUi();
  setGameState("result");
  makeAppearResultUi();

  resultShowTime = rootClock.getElapsedTime();

  cameraMoveResult();
};

export const retry = () => {
  makeAppearPlayingUi();
  makeDisappearResultUi();
  setGameState("ready");

  retryClickTime = rootClock.getElapsedTime();

  cameraMoveRetry();

  //late
  setScoreText(0);
  resetScore();
  countDown();
};

const cameraMoveResult = () => {
  const animated = requestAnimationFrame(cameraMoveResult);

  const currentTime = rootClock.getElapsedTime();
  const delta = currentTime - resultShowTime;
  const t = easeOutSine(clamp(delta / cameraMoveTime, 0, 1));

  camera.position.x =
    cameraPosNormal.x + (cameraPosResult.x - cameraPosNormal.x) * t;
  camera.position.y =
    cameraPosNormal.y + (cameraPosResult.y - cameraPosNormal.y) * t;
  camera.position.z =
    cameraPosNormal.z + (cameraPosResult.z - cameraPosNormal.z) * t;
  if (t >= 1) cancelAnimationFrame(animated);
};

const cameraMoveRetry = () => {
  const animated = requestAnimationFrame(cameraMoveRetry);

  const currentTime = rootClock.getElapsedTime();
  const delta = currentTime - retryClickTime;
  const t = easeOutSine(clamp(delta / cameraMoveTime, 0, 1));

  camera.position.x =
    cameraPosResult.x + (cameraPosNormal.x - cameraPosResult.x) * t;
  camera.position.y =
    cameraPosResult.y + (cameraPosNormal.y - cameraPosResult.y) * t;
  camera.position.z =
    cameraPosResult.z + (cameraPosNormal.z - cameraPosResult.z) * t;
  if (t >= 1) cancelAnimationFrame(animated);
};
