import { setLastHitTime } from "./camera";
import { charaPos } from "./chara";
import { noteTypeKeyMaps } from "./const";
import { gameClock, scene } from "./main";
import { generateHitNote, notes, removeAllNotes } from "./note";
import { result } from "./result";
import { incrementScore } from "./ui";

export const judgeRange = { start: charaPos - 5, end: charaPos };

const isInJudgeRange = (pos: number) => {
  const time = gameClock.getElapsedTime();
  const expandJudgeRangeByTime = time * 0.005;
  return (
    judgeRange.start <= pos && pos <= judgeRange.end + expandJudgeRangeByTime
  );
};

export const judgeNote = (pushedKey: string) => {
  const noteInRange = notes.filter((e) => isInJudgeRange(e.mesh.position.x));

  if (noteInRange.length === 0) return;

  const noteJudged = noteInRange[0];
  if (noteTypeKeyMaps[noteJudged.type].key === pushedKey) {
    incrementScore(1);
    generateHitNote(scene, noteJudged);
    setLastHitTime(gameClock.getElapsedTime());

    notes.splice(notes.indexOf(noteJudged), 1);
    scene.remove(noteJudged.mesh);
  } else {
    result();
    removeAllNotes(scene);
  }
};
