import * as THREE from "three";
import { getGameState, rootClock, scene } from "./main";

type CharaState = "normal" | "swing" | "gameOver";

export let charaState: CharaState = "normal";

export const charaPos = new THREE.Vector3(8.5, 0.5, 0);

const normalTexture = new THREE.TextureLoader().load("chara/normal.png");
const normal2Texture = new THREE.TextureLoader().load("chara/normal2.png");
const hitTexture = new THREE.TextureLoader().load("chara/hit.png");
const overTexture = new THREE.TextureLoader().load("chara/over.png");
const over2Texture = new THREE.TextureLoader().load("chara/over2.png");

const spriteMaterialColor = "#ffffff";
const normalMaterial = new THREE.SpriteMaterial({
  map: normalTexture,
  color: spriteMaterialColor,
  transparent: true,
  alphaTest: 0.5,
  fog: false,
});
const normal2Material = new THREE.SpriteMaterial({
  map: normal2Texture,
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
const over2Material = new THREE.SpriteMaterial({
  map: over2Texture,
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
  charaNormal();
};

export const isLockedSpriteAmongSwing = false;

export const charaNormal = () => {
  const changeSpan = 1;
  const timeTriggered = rootClock.getElapsedTime();
  let timeChanged = timeTriggered;
  let isSpriteTwo = false;
  sprite.material = normalMaterial;
  charaState = "normal";

  const spriteChange = () => {
    console.log();
    if (charaState === "normal") {
      requestAnimationFrame(spriteChange);

      if (rootClock.getElapsedTime() - timeChanged > changeSpan) {
        timeChanged = rootClock.getElapsedTime();
        if (isSpriteTwo) {
          isSpriteTwo = false;
          sprite.material = normalMaterial;
        } else {
          isSpriteTwo = true;
          sprite.material = normal2Material;
        }
      }
    }
  };

  spriteChange();
};

export const charaSwing = () => {
  sprite.material = hitMaterial;
  spriteChangeStack += 1;
  charaState = "swing";

  setTimeout(() => {
    spriteChangeStack -= 1;
    if (spriteChangeStack < 1) {
      if (getGameState() !== "playing") return;

      charaNormal();
    }
  }, 300);
};

export const charaGameOver = () => {
  const changeSpan = 1;
  const timeTriggered = rootClock.getElapsedTime();
  let timeChanged = timeTriggered;
  let isSpriteTwo = false;
  sprite.material = overMaterial;
  charaState = "gameOver";

  const spriteChange = () => {
    if (charaState === "gameOver") {
      requestAnimationFrame(spriteChange);

      if (rootClock.getElapsedTime() - timeChanged > changeSpan) {
        timeChanged = rootClock.getElapsedTime();
        if (isSpriteTwo) {
          isSpriteTwo = false;
          sprite.material = overMaterial;
        } else {
          isSpriteTwo = true;
          sprite.material = over2Material;
        }
      }
    }
  };

  spriteChange();
};
