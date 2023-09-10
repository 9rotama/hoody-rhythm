import { setGameState } from "./main";
import { makeAppearResultUi, makeDisappearPlayingUi } from "./ui";

export const result = () => {
  makeDisappearPlayingUi();
  setGameState("result");
  makeAppearResultUi();
};
