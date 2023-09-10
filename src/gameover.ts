import { setGameState } from "./main";
import { makeAppearResultUi, makeDisappearPlayingUi } from "./ui";

export const gameOver = () => {
  makeDisappearPlayingUi();
  setGameState("result");
  makeAppearResultUi();
};
