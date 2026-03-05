import { Text } from '@chakra-ui/react';
import { Color } from '@/constants/colors';

type Props = {
  muted?: boolean;
  color?: Color;
  value: string;
};

export default function CustomText(props: Props) {
  const color = props.muted ? 'fg.muted' : props.color && `${props.color}.500`;

  const fontSize = (props.muted || props.color) && 'xs';

  return (
    <Text color={color} fontSize={fontSize}>
      {props.value}
    </Text>
  );
}
