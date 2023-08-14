import { noteTypeKeyMaps } from "./const";

const scoreText = document.getElementById("score-text");
const buttons = document.getElementById("buttons");
const fullscreenSwitch = document.getElementById("fullscreen-switch");

let isFullscreen = false;

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

export const setScore = (score: number) => {
  if (scoreText) {
    scoreText.textContent = score.toString();
  } else {
    throw new Error("score elements not found");
  }
};

export const initUi = () => {
  if (scoreText) {
    scoreText.classList.add("is-transparent");
  } else {
    throw new Error("score elements not found");
  }

  if (buttons) {
    buttons.classList.add("is-transparent");

    noteTypeKeyMaps.forEach((e) => {
      const button = document.createElement("button");
      button.classList.add("button");
      button.id = `button-${e.name}`;
      button.textContent = e.key.toUpperCase();
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
};

export const makeAppearUi = () => {
  if (scoreText) {
    scoreText.classList.remove("is-transparent");
    scoreText.classList.add("ui-down");
  } else {
    throw new Error("score elements not found");
  }

  if (buttons) {
    buttons.classList.remove("is-transparent");
    buttons.classList.add("ui-up");
  } else {
    throw new Error("button elements not found");
  }
};

export const makeDisappearUi = () => {};
