// その範囲に入ってたらtrue
const isInRange = (target: number, base: number, abs: number): boolean => {
  if (base - abs <= target && target <= base + abs) {
      return true;
  }
  return false;
}

export default isInRange;