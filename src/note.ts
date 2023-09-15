import * as THREE from "three";
import { getRandInt } from "./utils";
import { gameClock, getGameState, scene } from "./main";
import { noteTypeKeyMaps } from "./const";
import { result } from "./result";
import { judgeRange } from "./judge";
import { folderPos } from "./stage";
import { charaPos } from "./chara";

type Note = {
  id: number;
  type: number;
  pos: number; //出現時0, キャラに重なったとき1
  mesh: THREE.Mesh;
};

type HitNote = {
  id: number;
  type: number;
  hitTime: number;
  flyDir: THREE.Vector3;
  mesh: THREE.Mesh;
};

export const notes: Note[] = [];

export const hitNotes: HitNote[] = [];

const initSpeed = 0.002;
const initSpawnSpan = 4; //s
const increaseSpeedByTime = 0.0004;

const generatePos = new THREE.Vector3(folderPos.x, folderPos.y, folderPos.z);

let elapsedTimeFromGenerate = initSpawnSpan;
let noteId = 0;
let flyNoteId = 0;

const hitNoteFlySpeed = 1;
const hitNoteRotSpeed = 0.2;
const hitNoteLifetime = 1;

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
    mesh.castShadow = true;
    mesh.position.x = generatePos.x;

    scene.add(mesh);

    notes.push({ id: ++noteId, type: colorIdx, pos: 0, mesh: mesh });
  }
};
const hitPos = new THREE.Vector3(charaPos.x - 2, charaPos.y, charaPos.z);
const moveAngle = Math.PI / 3;
const startAngle = Math.PI / 2 - moveAngle / 2;
const endAngle = Math.PI / 2 + moveAngle / 2;
const radius =
  (hitPos.x - folderPos.x) / (Math.cos(endAngle) - Math.cos(startAngle));

const center = new THREE.Vector3(
  folderPos.x - Math.cos(startAngle) * radius,
  folderPos.y - Math.sin(endAngle) * radius,
  0
);

export const calcNotePos = (pos: number) => {
  const x = Math.cos(startAngle + pos * moveAngle) * radius + center.x;
  const y = -(Math.sin(startAngle + pos * moveAngle) * radius + center.y);

  return new THREE.Vector3(x, y, 0);
};

export const moveNotes = () => {
  const speed = getSpeedRate() * initSpeed;
  notes.forEach((note) => {
    note.pos += speed;

    const pos = calcNotePos(note.pos);
    note.mesh.position.set(pos.x, pos.y, pos.z);
    note.mesh.rotation.x += speed;
    note.mesh.rotation.y += speed;
    note.mesh.rotation.z += speed;
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

export const generateHitNote = (scene: THREE.Scene, targetNote: Note) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: noteTypeKeyMaps[targetNote.type].noteColor,
  });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.x = targetNote.mesh.position.x;
  mesh.position.y = targetNote.mesh.position.y;
  mesh.position.z = targetNote.mesh.position.z;
  mesh.castShadow = true;

  scene.add(mesh);

  const flyDir = new THREE.Vector3(
    -Math.random(),
    Math.random(),
    Math.random()
  ).normalize();
  hitNotes.push({
    id: ++flyNoteId,
    type: targetNote.type,
    hitTime: gameClock.getElapsedTime(),
    flyDir: flyDir,
    mesh: mesh,
  });
};

export const moveHitNotes = () => {
  hitNotes.forEach((note) => {
    note.mesh.position.x += hitNoteFlySpeed * note.flyDir.x;
    note.mesh.position.y += hitNoteFlySpeed * note.flyDir.y;
    note.mesh.position.z += hitNoteFlySpeed * note.flyDir.z;
    note.mesh.rotation.x += hitNoteRotSpeed;
    note.mesh.rotation.y += hitNoteRotSpeed;
    note.mesh.rotation.z += hitNoteRotSpeed;
  });
};

export const removeHitNotes = () => {
  hitNotes.forEach((note, i) => {
    if (hitNoteLifetime < gameClock.getElapsedTime() - note.hitTime) {
      scene.remove(note.mesh);
      hitNotes.splice(i, 1);
    }
  });
};

export const removeAllNotes = (scene: THREE.Scene) => {
  notes.forEach((note) => {
    scene.remove(note.mesh);
  });
  hitNotes.forEach((note) => {
    scene.remove(note.mesh);
  });
  notes.splice(0);
  hitNotes.splice(0);
};
