import * as THREE from "three";
import { camera, cameraPosNormal, rootClock, setGameState } from "./main";
import {
  makeAppearPlayingUi,
  makeAppearResultUi,
  makeDisappearPlayingUi,
  makeDisappearResultUi,
} from "./ui";
import { charaPos } from "./chara";
import { clamp } from "three/src/math/MathUtils.js";
import { easeOutSine } from "./utils";

let resultShowTime = 0;
let retryClickTime = 0;
const cameraMoveTime = 0.8;

const cameraPosResult = new THREE.Vector3(charaPos, 0, 8);

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
};

const cameraMoveResult = () => {
  requestAnimationFrame(cameraMoveResult);

  const currentTime = rootClock.getElapsedTime();
  const delta = currentTime - resultShowTime;
  const t = easeOutSine(clamp(delta / cameraMoveTime, 0, 1));
  camera.position.x =
    cameraPosNormal.x + (cameraPosResult.x - cameraPosNormal.x) * t;
  camera.position.y =
    cameraPosNormal.y + (cameraPosResult.y - cameraPosNormal.y) * t;
  camera.position.z =
    cameraPosNormal.z + (cameraPosResult.z - cameraPosNormal.z) * t;
};

const cameraMoveRetry = () => {
  requestAnimationFrame(cameraMoveRetry);

  const currentTime = rootClock.getElapsedTime();
  const delta = currentTime - retryClickTime;
  const t = easeOutSine(clamp(delta / cameraMoveTime, 0, 1));
  camera.position.x =
    cameraPosResult.x + (cameraPosNormal.x - cameraPosResult.x) * t;
  camera.position.y =
    cameraPosResult.y + (cameraPosNormal.y - cameraPosResult.y) * t;
  camera.position.z =
    cameraPosResult.z + (cameraPosNormal.z - cameraPosResult.z) * t;
};
