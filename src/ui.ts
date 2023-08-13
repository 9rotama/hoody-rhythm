const scoreText = document.getElementById("score-text");

export const setScore = (score: number) => {
  if (scoreText) scoreText.textContent = score.toString();
};

export const initUi = () => {
  scoreText?.classList.add("is-transparent");
};

export const makeAppearUi = () => {
  scoreText?.classList.remove("is-transparent");
  scoreText?.classList.add("ui-down");
};

export const makeDisappearUi = () => {};
