import { Color } from '@/constants/colors';

export function placeColor(x: number, y: number) {
  return Math.abs(x) < Math.abs(y)
    ? y > 0
      ? Color.YELLOW
      : Color.RED
    : x > 0
      ? Color.GREEN
      : Color.BLUE;
}
