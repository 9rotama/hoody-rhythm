import * as THREE from "three";
import { scene } from "./main";
import { noteTypeKeyMaps } from "./const";

export const charaPos = new THREE.Vector3(9.5, 0, 0);

const geometry = new THREE.PlaneGeometry(5, 5);
const defaultMaterial = new THREE.MeshPhongMaterial();
const spritePlane = new THREE.Mesh(geometry, defaultMaterial);
spritePlane.castShadow = true;
let spriteChangeStack = 0;

export const addChara = () => {
  spritePlane.position.set(charaPos.x, charaPos.y, charaPos.z);
  scene.add(spritePlane);
};

export const charaSwing = (pushedKey: string) => {
  const material = new THREE.MeshPhongMaterial({
    color: noteTypeKeyMaps.filter((e) => e.key == pushedKey)[0].noteColor,
  });
  spritePlane.material = material;
  spriteChangeStack += 1;

  setTimeout(() => {
    spriteChangeStack -= 1;
    if (spriteChangeStack < 1) {
      spritePlane.material = defaultMaterial;
    }
  }, 300);
};
