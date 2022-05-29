const normalizeDirection = (rad: number) => {
  if (rad >= -Math.PI / 2) {
    return rad + Math.PI / 2;
  }
  return rad + Math.PI * 5 / 2;
};

export default normalizeDirection;
