import { Color } from '@/constants/colors';

export const colorToVar = (color: Color | 'purple') =>
  `var(--chakra-colors-${color}-500)`;
