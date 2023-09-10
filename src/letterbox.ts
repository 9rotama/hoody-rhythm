import * as THREE from "three";
import { camera, scene } from "./main";

const geometry = new THREE.PlaneGeometry(4, 100);
const material = new THREE.MeshPhongMaterial({
  color: "#444466",
});

const left = new THREE.Mesh(geometry, material);
const right = new THREE.Mesh(geometry, material);

export const addLetterBox = () => {
  left.position.x = -10;
  left.position.z = 5;
  right.position.x = 10;
  right.position.z = 5;

  scene.add(left, right);
  fixToCameraLetterBox();
};

export const fixToCameraLetterBox = () => {
  requestAnimationFrame(fixToCameraLetterBox);
  left.position.x = camera.position.x - 10;
  left.position.z = camera.position.z - 5;
  right.position.x = camera.position.x + 10;
  right.position.z = camera.position.z - 5;
};
