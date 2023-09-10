export const getRandInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const easeOutSine = (x: number) => {
  return 1 - Math.pow(1 - x, 5);
};
