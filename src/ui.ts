const scoreText = document.getElementById("score-text");

export const setScore = (score: number) => {
  if (scoreText) {
    scoreText.textContent = score.toString();
  } else {
    throw new Error("score elements not found");
  }
};

export const initUi = () => {
  if (scoreText) {
    scoreText?.classList.add("is-transparent");
  } else {
    throw new Error("score elements not found");
  }
};

export const makeAppearUi = () => {
  if (scoreText) {
    scoreText.classList.remove("is-transparent");
    scoreText.classList.add("ui-down");
  } else {
    throw new Error("score elements not found");
  }
};

export const makeDisappearUi = () => {};
