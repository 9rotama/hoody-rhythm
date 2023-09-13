import { camera, cameraPosNormal, gameClock } from "./main";
import { easeOutElastic } from "./utils";

let lastHitTime = 0;
const quakeDur = 0.5;

export const setLastHitTime = (time: number) => {
  lastHitTime = time;
};

export const quakeCameraWhenHit = () => {
  const deltaTimeFromLastHit = gameClock.getElapsedTime() - lastHitTime;
  if (lastHitTime !== 0 && deltaTimeFromLastHit <= quakeDur) {
    const easingRate = deltaTimeFromLastHit / quakeDur;
    const moveSize = 0.5;

    camera.position.set(
      cameraPosNormal.x + (moveSize - easeOutElastic(easingRate) * moveSize),
      cameraPosNormal.y,
      cameraPosNormal.z
    );
    console.log("aa");
  } else {
    camera.position.set(
      cameraPosNormal.x,
      cameraPosNormal.y,
      cameraPosNormal.z
    );
    return;
  }
};
