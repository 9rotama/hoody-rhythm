import * as THREE from "three";
import { scene } from "./main";
import { noteTypeKeyMaps } from "./const";

export const charaPos = 8;

const geometry = new THREE.PlaneGeometry(3, 3);
const defaultMaterial = new THREE.MeshPhongMaterial();
const spritePlane = new THREE.Mesh(geometry, defaultMaterial);

let spriteChangeStack = 0;

export const charaInit = () => {
  spritePlane.position.x = charaPos;
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
