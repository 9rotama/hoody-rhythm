import { charaSwing } from "./chara";
import { noteTypeKeyMaps } from "./const";
import { judgeNote } from "./judge";
import { getGameState } from "./main";
import { retry } from "./result";

const scoreText = document.getElementById("score-text");
const buttonContainer = document.getElementById("button-container");
const fullscreenSwitch = document.getElementById("fullscreen-switch");
const result = document.getElementById("result");
const resultScoreText = document.getElementById("result-score-text");
const retryButton = document.getElementById("retry-button");
const rotatePhone = document.getElementById("rotate-phone");

let isFullscreen = false;

let score = 0;

const switchFullscreen = () => {
  if (fullscreenSwitch) {
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
      button.addEventListener("touchstart", () => {
        if (getGameState() !== "playing") return;
        charaSwing();
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

  if (result) {
    result.classList.add("is-hidden");
  } else {
    throw new Error("result element not found");
  }
};

export const makeAppearPlayingUi = () => {
  if (scoreText) {
    scoreText.classList.remove("is-hidden");
    scoreText.classList.add("top-ui-appear");
    setTimeout(() => {
      scoreText.classList.remove("top-ui-appear");
    }, 400);
  } else {
    throw new Error("score elements not found");
  }

  if (buttonContainer) {
    buttonContainer.classList.remove("is-hidden");
    buttonContainer.classList.remove("bottom-ui-hide");
    buttonContainer.classList.add("bottom-ui-appear");
    setTimeout(() => {}, 400);
  } else {
    throw new Error("button elements not found");
  }
};

export const makeDisappearPlayingUi = () => {
  if (scoreText) {
    scoreText.classList.add("top-ui-hide");
    setTimeout(() => {
      scoreText.classList.add("is-hidden");
      scoreText.classList.remove("top-ui-hide");
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
  if (result) {
    result.classList.remove("result-ui-hide");
    result.classList.remove("is-hidden");
    result.classList.add("result-ui-appear");
  } else {
    throw new Error("result element not found");
  }

  if (resultScoreText) {
    resultScoreText.textContent = score.toString();
  } else {
    throw new Error("result score element not found");
  }

  if (retryButton) {
    setTimeout(() => {
      retryButton.addEventListener("click", retry);
    }, 1000);
  } else {
    throw new Error("retry button elements not found");
  }
};

export const makeDisappearResultUi = () => {
  if (result) {
    result.classList.remove("result-ui-appear");
    result.classList.add("result-ui-hide");
    setTimeout(() => {
      result.classList.add("is-hidden");
    }, 400);
  } else {
    throw new Error("result element not found");
  }

  if (retryButton) {
    retryButton.removeEventListener("click", retry);
  } else {
    throw new Error("retry button elements not found");
  }
};

export const makeAppearRotatePhoneUi = () => {
  if (rotatePhone) {
    rotatePhone.classList.remove("is-hidden");
  } else {
    throw new Error("rotate phone element not found");
  }
};

export const makeDisappearRotatePhoneUi = () => {
  if (rotatePhone) {
    rotatePhone.classList.add("is-hidden");
  } else {
    throw new Error("rotate phone element not found");
  }
};

export const handleRotatePhoneUi = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (width / height < 16 / 10) {
    makeAppearRotatePhoneUi();
  } else {
    makeDisappearRotatePhoneUi();
  }
};

export const quakeScoreText = () => {
  if (scoreText) {
    scoreText.classList.add("quake-score");
    setTimeout(() => {
      scoreText.classList.remove("quake-score");
    }, 100);
  } else {
    throw new Error("score element not found");
  }
};
