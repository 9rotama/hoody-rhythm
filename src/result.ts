import * as THREE from "three";
import { camera, cameraPosNormal, rootClock, setGameState } from "./main";
import { makeAppearResultUi, makeDisappearPlayingUi } from "./ui";
import { charaPos } from "./chara";
import { clamp } from "three/src/math/MathUtils.js";
import { easeOutSine } from "./utils";

let resultShowTime = 0;
const cameraMoveTime = 0.8;

const cameraPosResult = new THREE.Vector3(charaPos, 0, 8);

export const result = () => {
  makeDisappearPlayingUi();
  setGameState("result");
  makeAppearResultUi();

  resultShowTime = rootClock.getElapsedTime();

  cameraMoveResult();
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
