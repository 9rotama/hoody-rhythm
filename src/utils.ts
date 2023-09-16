export const getRandInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const easeOutSine = (x: number) => {
  return 1 - Math.pow(1 - x, 5);
};

export const easeOutElastic = (x: number) => {
  const c4 = (2 * Math.PI) / 3;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};
