import * as THREE from "three";
import { getRandInt } from "./utils";
import { gameClock, getGameState, scene } from "./main";
import { noteTypeKeyMaps } from "./const";
import { result } from "./result";
import { judgeRange } from "./judge";

type Note = {
  id: number;
  type: number;
  mesh: THREE.Mesh;
};

export const notes: Note[] = [];

const initSpeed = 0.03;
const initSpawnSpan = 4; //s
const increaseSpeedByTime = 0.0035;

const generatePos = -20;

let elapsedTimeFromGenerate = 0;
let id = 0;

const getSpeedRate = () => {
  // 現在の時間を加味してスピードを計算し、初期のスピードより何倍早いかを返す
  const speedRate =
    (initSpeed + increaseSpeedByTime * gameClock.getElapsedTime()) / initSpeed;
  return speedRate;
};

export const generateNotes = () => {
  elapsedTimeFromGenerate += gameClock.getDelta();
  const spawnSpan = initSpawnSpan / getSpeedRate();
  //スピードに半比例してスポーン周期を狭くする

  if (elapsedTimeFromGenerate > spawnSpan) {
    elapsedTimeFromGenerate = 0;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const colorIdx = getRandInt(noteTypeKeyMaps.length);
    const material = new THREE.MeshPhongMaterial({
      color: noteTypeKeyMaps[colorIdx].noteColor,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = generatePos;

    scene.add(mesh);

    notes.push({ id: ++id, type: colorIdx, mesh: mesh });
  }
};

export const moveNotes = () => {
  const speed = getSpeedRate() * initSpeed;
  notes.forEach((note) => {
    note.mesh.position.x += speed;
    note.mesh.rotation.x += speed / 10;
    note.mesh.rotation.y += speed / 10;
    note.mesh.rotation.z += speed / 10;
  });
};

export const removeOutNotes = (scene: THREE.Scene) => {
  notes.forEach((note, i) => {
    if (note.mesh.position.x >= judgeRange.end) {
      if (getGameState() == "playing") {
        result();
        removeAllNotes(scene);
      }
      notes.splice(i, 1);
      scene.remove(note.mesh);
    }
  });
};

export const removeAllNotes = (scene: THREE.Scene) => {
  notes.forEach((note) => {
    scene.remove(note.mesh);
  });
  notes.splice(0);
};
