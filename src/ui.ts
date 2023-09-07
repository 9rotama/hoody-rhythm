import { charaSwing } from "./chara";
import { noteTypeKeyMaps } from "./const";
import { judgeNote } from "./judge";

const scoreText = document.getElementById("score-text");
const buttons = document.getElementById("buttons");
const fullscreenSwitch = document.getElementById("fullscreen-switch");
const retryButton = document.getElementById("retry-button");

let isFullscreen = false;

let score = 0;

const switchFullscreen = () => {
  if (fullscreenSwitch) {
    console.log(isFullscreen);
    if (isFullscreen) {
      document.exitFullscreen();
      isFullscreen = false;
    } else {
      document.documentElement.requestFullscreen();
      isFullscreen = true;
    }
  } else {
    throw new Error("fullscreen switch element not found");
  }
};

export const setScoreText = (score: number) => {
  if (scoreText) {
    scoreText.textContent = score.toString();
  } else {
    throw new Error("score elements not found");
  }
};

export const incrementScore = (increment: number) => {
  score += increment;
  setScoreText(score);
};

export const initUi = () => {
  if (scoreText) {
    scoreText.classList.add("is-hidden");
  } else {
    throw new Error("score elements not found");
  }

  if (buttons) {
    buttons.classList.add("is-hidden");

    noteTypeKeyMaps.forEach((e) => {
      const button = document.createElement("button");
      button.classList.add("button");
      button.id = `button-${e.name}`;
      button.textContent = e.key.toUpperCase();
      button.addEventListener("click", () => {
        charaSwing(e.key);
        judgeNote(e.key);
      });
      buttons.appendChild(button);
    });
  } else {
    throw new Error("button elements not found");
  }

  if (fullscreenSwitch) {
    fullscreenSwitch.addEventListener("click", () => {
      switchFullscreen();
    });
  } else {
    throw new Error("fullscreen switch element not found");
  }

  if (retryButton) {
    retryButton.classList.add("is-hidden");
  } else {
    throw new Error("retry button elements not found");
  }
};

export const makeAppearUi = () => {
  if (scoreText) {
    scoreText.classList.remove("is-hidden");
    scoreText.classList.add("ui-down");
  } else {
    throw new Error("score elements not found");
  }

  if (buttons) {
    buttons.classList.remove("is-hidden");
    buttons.classList.add("ui-up");
  } else {
    throw new Error("button elements not found");
  }
};

export const makeDisappearUi = () => {};
