import { charaSwing } from "./chara";
import { noteTypeKeyMaps } from "./const";
import { judgeNote } from "./judge";
import { retry } from "./result";

const scoreText = document.getElementById("score-text");
const buttonContainer = document.getElementById("button-container");
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

export const resetScore = () => {
  score = 0;
  setScoreText(0);
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

  if (buttonContainer) {
    buttonContainer.classList.add("is-hidden");

    noteTypeKeyMaps.forEach((e) => {
      const button = document.createElement("button");
      button.classList.add("button");
      button.classList.add("is-center");
      button.id = `button-${e.name}`;
      button.textContent = e.key.toUpperCase();
      button.addEventListener("click", () => {
        charaSwing(e.key);
        judgeNote(e.key);
      });
      buttonContainer.appendChild(button);
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
    retryButton.addEventListener("click", () => {
      retry();
    });
    retryButton.classList.add("is-hidden");
  } else {
    throw new Error("retry button elements not found");
  }
};

export const makeAppearPlayingUi = () => {
  if (scoreText) {
    scoreText.classList.remove("is-hidden");
    scoreText.classList.remove("top-ui-hide");
    scoreText.classList.add("top-ui-appear");
  } else {
    throw new Error("score elements not found");
  }

  if (buttonContainer) {
    buttonContainer.classList.remove("is-hidden");
    buttonContainer.classList.remove("bottom-ui-hide");
    buttonContainer.classList.add("bottom-ui-appear");
  } else {
    throw new Error("button elements not found");
  }
};

export const makeDisappearPlayingUi = () => {
  if (scoreText) {
    scoreText.classList.remove("top-ui-appear");
    scoreText.classList.add("top-ui-hide");
    setTimeout(() => {
      scoreText.classList.add("is-hidden");
    }, 400);
  } else {
    throw new Error("score elements not found");
  }

  if (buttonContainer) {
    buttonContainer.classList.remove("bottom-ui-appear");
    buttonContainer.classList.add("bottom-ui-hide");
    setTimeout(() => {
      buttonContainer.classList.add("is-hidden");
    }, 400);
  } else {
    throw new Error("button elements not found");
  }
};

export const makeAppearResultUi = () => {
  if (retryButton) {
    retryButton.classList.remove("is-hidden");
    retryButton.classList.remove("bottom-ui-hide");
    retryButton.classList.add("bottom-ui-appear");
  } else {
    throw new Error("retryButton element not found");
  }
};

export const makeDisappearResultUi = () => {
  if (retryButton) {
    retryButton.classList.remove("bottom-ui-appear");
    retryButton.classList.add("bottom-ui-hide");
    setTimeout(() => {
      retryButton.classList.add("is-hidden");
    }, 400);
  } else {
    throw new Error("retryButton element not found");
  }
};
