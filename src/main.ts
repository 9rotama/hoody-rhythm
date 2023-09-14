import "./style.css";
import {
  generateNotes,
  moveHitNotes,
  moveNotes,
  removeHitNotes,
  removeOutNotes,
} from "./note";
import * as THREE from "three";
import { addChara, charaSwing } from "./chara";
import { noteTypeKeyMaps } from "./const";
import { countDown } from "./countdown";
import { addLetterBox } from "./letterbox";
import {
  handleRotatePhoneUi,
  initUi,
  makeAppearPlayingUi,
  resetScore,
  setScoreText,
} from "./ui";
import { judgeNote } from "./judge";
import { initStage } from "./stage";
import { quakeCameraWhenHit } from "./camera";

type GameState = "ready" | "playing" | "result";

let gameState: GameState = "ready";

export const getGameState = () => {
  return gameState;
};

export const setGameState = (state: GameState) => {
  gameState = state;
};

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
export const cameraPosNormal = new THREE.Vector3(0, 0, 10);
camera.position.x = cameraPosNormal.x;
camera.position.y = cameraPosNormal.y;
camera.position.z = cameraPosNormal.z;

export const rootClock = new THREE.Clock();

export const gameClock = new THREE.Clock(false);

handleRotatePhoneUi();
initUi();
setScoreText(0);
resetScore();

makeAppearPlayingUi();

countDown();

scene.background = new THREE.Color("#ddddff");

const hemiLight = new THREE.HemisphereLight("#000000", "#ddddff", 5.0);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight("#ddddff", 10.0);
dirLight.castShadow = true;
scene.add(dirLight);

dirLight.shadow.camera.left = -20;
dirLight.shadow.camera.right = 20;
dirLight.shadow.camera.bottom = -40;
dirLight.shadow.camera.top = 40;
dirLight.shadow.mapSize.width = 512;
dirLight.shadow.mapSize.height = 512;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.getElementById("app")?.appendChild(renderer.domElement);

addChara();

addLetterBox();

initStage();

const keyMaps = noteTypeKeyMaps.map((e) => e.key);
const onkeydown = (ev: KeyboardEvent) => {
  if (keyMaps.includes(ev.key)) {
    charaSwing(ev.key);
    judgeNote(ev.key);
  }
};

document.onkeydown = onkeydown;

const update = () => {
  requestAnimationFrame(update);
  if (gameState === "playing") {
    generateNotes();
    moveNotes();
    removeOutNotes(scene);
    moveHitNotes();
    removeHitNotes();
    quakeCameraWhenHit();
  }

  renderer.render(scene, camera);
};
update();

const onResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // カメラのアスペクト比を正す
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  handleRotatePhoneUi();
};

window.addEventListener("resize", onResize);
