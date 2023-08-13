import * as THREE from "three";
import { scene } from "./main";

const geometry = new THREE.PlaneGeometry(4, 100);
const material = new THREE.MeshPhongMaterial({
  color: "#444466",
});

export const addLetterBox = () => {
  const left = new THREE.Mesh(geometry, material);
  left.position.x = -10;
  left.position.z = 5;
  const right = new THREE.Mesh(geometry, material);
  right.position.x = 10;
  right.position.z = 5;

  scene.add(left, right);
};
