import { gameClock } from "./main";

const countdownText = document.getElementById("countdown-text");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const countDown = async () => {
  if (countdownText) {
    await sleep(1000);
    countdownText.classList.add("fadein");
    countdownText.textContent = "READY...";

    await sleep(1000);

    countdownText.textContent = "GO!!";

    await sleep(800);

    countdownText.classList.add("fadeout");
    await sleep(200);

    countdownText.textContent = "";
  }

  gameClock.start();
};
