import "./style.css";
import { generateNotes, moveNotes, removeOutNotes } from "./note";
import * as THREE from "three";
import { addChara, charaSwing } from "./chara";
import { noteTypeKeyMaps } from "./const";
import { countDown } from "./countdown";
import { addLetterBox } from "./letterbox";
import { initUi, makeAppearPlayingUi, resetScore, setScoreText } from "./ui";
import { judgeNote } from "./judge";

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

initUi();
setScoreText(0);
resetScore();

makeAppearPlayingUi();

countDown();

scene.background = new THREE.Color("#ddddff");

const hemiLight = new THREE.HemisphereLight("#000000", "#ddddff", 5.0);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight("#ddddff", 10.0);
scene.add(dirLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("app")?.appendChild(renderer.domElement);

addChara();

addLetterBox();

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
};
window.addEventListener("resize", onResize);
