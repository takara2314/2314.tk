const calcDirection = (x: number, y: number): number => {
  if (x !== 0.0) {
    return Math.atan(y / x);
  }

  if (y >= 0) {
    return Math.PI / 2;
  }

  return 3 * Math.PI / 2;
};

export default calcDirection;
