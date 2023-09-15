import { setLastHitTime } from "./camera";
import { charaPos } from "./chara";
import { noteTypeKeyMaps } from "./const";
import { gameClock, scene } from "./main";
import { generateHitNote, notes, removeAllNotes } from "./note";
import { result } from "./result";
import { incrementScore, quakeScoreText } from "./ui";

export const judgeRange: { start: number; end: number } = {
  start: charaPos.x - 5,
  end: charaPos.x,
};

const isInJudgeRange = (pos: number) => {
  const time = gameClock.getElapsedTime();
  const expandJudgeRangeByTime = time * 0.013;
  console.log(judgeRange.end + expandJudgeRangeByTime);
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
    quakeScoreText();

    notes.splice(notes.indexOf(noteJudged), 1);
    scene.remove(noteJudged.mesh);
  } else {
    result();
    removeAllNotes(scene);
  }
};
