import { charaPos } from "./chara";
import { noteTypeKeyMaps } from "./const";
import { scene } from "./main";
import { notes } from "./note";
import { incrementScore } from "./ui";

const judgeRange = { start: charaPos - 3, end: charaPos + 3 };

const isInJudgeRange = (pos: number) => {
  return judgeRange.start <= pos && pos <= judgeRange.end;
};

export const judgeNote = (pushedKey: string) => {
  const noteInRange = notes.filter((e) => isInJudgeRange(e.mesh.position.x));

  if (noteInRange.length === 0) return;

  const noteJudged = noteInRange[0];
  if (noteTypeKeyMaps[noteJudged.type].key === pushedKey) {
    incrementScore(1);
    notes.splice(notes.indexOf(noteJudged), 1);
    scene.remove(noteJudged.mesh);
  } else {
    // ライフを減らす処理
  }
};