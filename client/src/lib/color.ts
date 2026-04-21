import { Color } from '@/constants/colors';

export const colorToVar = (color: Color | 'purple' | 'gray') =>
  `var(--chakra-colors-${color}-500)`;
