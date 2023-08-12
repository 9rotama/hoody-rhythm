import * as THREE from "three";
import { getRandInt } from "./utils";
import { gameClock, scene } from "./main";
import { noteTypeKeyMaps } from "./const";

type Note = {
  type: number;
  mesh: THREE.Mesh;
};

let notes: Note[] = [];

const initSpeed = 0.1;
const initSpawnSpan = 1; //s
const increaseSpeedByTime = 0.0035;

const generatePos = -20;
const killPos = 20;

let elaspedTimeFromGenerate = 0;

const getSpeedRate = () => {
  // 現在の時間を加味してスピードを計算し、初期のスピードより何倍早いかを返す
  const speedRate =
    (initSpeed + increaseSpeedByTime * gameClock.getElapsedTime()) / initSpeed;
  return speedRate;
};

export const generateNotes = () => {
  elaspedTimeFromGenerate += gameClock.getDelta();
  const spawnSpan = initSpawnSpan / getSpeedRate();
  //スピードに半比例してスポーン周期を狭くする

  if (elaspedTimeFromGenerate > spawnSpan) {
    elaspedTimeFromGenerate = 0;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const colorIdx = getRandInt(noteTypeKeyMaps.length);
    const material = new THREE.MeshPhongMaterial({
      color: noteTypeKeyMaps[colorIdx].noteColor,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = generatePos;

    scene.add(mesh);

    notes.push({ type: 0, mesh: mesh });
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

export const removeNotes = (scene: THREE.Scene) => {
  notes.forEach((note, i) => {
    if (note.mesh.position.x >= killPos) {
      notes.splice(i, 1);
      scene.remove(note.mesh);
    }
  });
};
