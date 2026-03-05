import { Color } from '@/constants/colors';

export function placeColor(x: number, y: number) {
  return Math.abs(x) < Math.abs(y)
    ? y > 0
      ? Color.RED
      : Color.YELLOW
    : x > 0
      ? Color.GREEN
      : Color.BLUE;
}
