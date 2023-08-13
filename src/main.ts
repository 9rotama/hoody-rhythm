import "./style.css";
import { generateNotes, moveNotes, removeNotes } from "./note";
import * as THREE from "three";
import { addChara, charaSwing } from "./chara";
import { noteTypeKeyMaps } from "./const";
import { countDown } from "./countdown";
import { addLetterBox } from "./letterbox";
import { initUi, makeAppearUi, setScore } from "./ui";

export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

export const rootClock = new THREE.Clock();

export const gameClock = new THREE.Clock(false);

initUi();
setScore(0);
makeAppearUi();

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
  }
};

document.onkeydown = onkeydown;

const update = () => {
  requestAnimationFrame(update);
  generateNotes();
  moveNotes();
  removeNotes(scene);
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
