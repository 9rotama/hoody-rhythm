import { gameClock, setGameState } from "./main";

const countdownText = document.getElementById("countdown-text");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const countDown = async () => {
  if (countdownText) {
    await sleep(1000);
    countdownText.classList.add("countdown-fadein");
    countdownText.textContent = "READY...";
    await sleep(1000);
    countdownText.textContent = "GO!!";
    setGameState("playing");
    gameClock.start();

    await sleep(800);
    countdownText.classList.add("countdown-fadeout");
    await sleep(200);
    countdownText.textContent = "";

    countdownText.classList.remove("countdown-fadein");
    countdownText.classList.remove("countdown-fadeout");
  } else {
    throw new Error("countdown elements not found");
  }
};
