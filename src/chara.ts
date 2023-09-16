import * as THREE from "three";
import { getGameState, scene } from "./main";

export const charaPos = new THREE.Vector3(8.5, 0.5, 0);

const normalTexture = new THREE.TextureLoader().load("chara/normal.png");
const hitTexture = new THREE.TextureLoader().load("chara/hit.png");
const overTexture = new THREE.TextureLoader().load("chara/over.png");

const spriteMaterialColor = "#ffffff";
const normalMaterial = new THREE.SpriteMaterial({
  map: normalTexture,
  color: spriteMaterialColor,
  transparent: true,
  alphaTest: 0.5,

  fog: false,
});

const hitMaterial = new THREE.SpriteMaterial({
  map: hitTexture,
  color: spriteMaterialColor,
  transparent: true,
  alphaTest: 0.5,

  fog: false,
});
const overMaterial = new THREE.SpriteMaterial({
  map: overTexture,
  color: spriteMaterialColor,
  transparent: true,
  alphaTest: 0.5,
  fog: false,
});

const sprite = new THREE.Sprite(normalMaterial);
sprite.scale.set(6, 6, 1);

let spriteChangeStack = 0;

export const addChara = () => {
  sprite.position.set(charaPos.x, charaPos.y, charaPos.z);
  scene.add(sprite);
};

export const charaSwing = () => {
  sprite.material = hitMaterial;
  spriteChangeStack += 1;

  setTimeout(() => {
    spriteChangeStack -= 1;
    if (spriteChangeStack < 1) {
      if (getGameState() !== "playing") return;

      sprite.material = normalMaterial;
    }
  }, 300);
};

export const charaGameOver = () => {
  sprite.material = overMaterial;
};

export const charaReset = () => {
  sprite.material = normalMaterial;
};
