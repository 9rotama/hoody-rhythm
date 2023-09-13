import { scene } from "./main";
import * as THREE from "three";

const floorGeometry = new THREE.PlaneGeometry(100, 100, 32, 32);
const glassFloorMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
glassFloorMaterial.transparent = true;
glassFloorMaterial.opacity = 0.1;
const gridFloorMaterial = new THREE.MeshPhongMaterial({
  color: "#aaaacc",
  side: THREE.DoubleSide,
  wireframe: true,
});
const glassFloor = new THREE.Mesh(floorGeometry, glassFloorMaterial);
const gridFloor = new THREE.Mesh(floorGeometry, gridFloorMaterial);
glassFloor.receiveShadow = true;
glassFloor.position.y = -2.5;
glassFloor.rotation.x = 90;
gridFloor.position.y = -2.5;
gridFloor.rotation.x = 90;

const fog = new THREE.Fog("#ddddff", 1, 40);

export const initStage = () => {
  scene.add(glassFloor);
  scene.add(gridFloor);
  scene.fog = fog;
};
