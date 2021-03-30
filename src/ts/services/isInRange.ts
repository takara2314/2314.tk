// その範囲に入ってたらtrueを返す関数
const isInRange = (target: number, base: number, abs: number): boolean => {
  if (base - abs <= target && target <= base + abs) {
      return true;
  }
  return false;
}

export default isInRange;