import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const clock = new THREE.Clock();
clock.start();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const ambientLight = new THREE.AmbientLight("#ddddff", 1.0);
const material = new THREE.MeshBasicMaterial({ color: 0x555588 });
const cube = new THREE.Mesh(geometry, material);
scene.background = new THREE.Color("#ddddff");
scene.add(cube);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  cube.position.x = Math.sin(clock.getElapsedTime()) * 5;
  cube.position.y = Math.cos(clock.getElapsedTime()) * 5;
  renderer.render(scene, camera);
}
render();

window.addEventListener("resize", onResize);

function onResize() {
  // サイズを取得
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // カメラのアスペクト比を正す
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
