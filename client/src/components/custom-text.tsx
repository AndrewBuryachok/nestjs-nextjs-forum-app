import { Text } from '@chakra-ui/react';
import { Color } from '@/constants/colors';

type Props = {
  big?: true;
  bold?: true;
  center?: true;
  muted?: true;
  color?: Color;
  value: React.ReactNode;
};

export default function CustomText(props: Props) {
  const color = props.muted ? 'fg.muted' : props.color && `${props.color}.500`;

  const fontSize = props.big ? 'sm' : 'xs';

  const fontWeight = props.bold && 'bold';

  const textAlign = props.center && 'center';

  return (
    <Text
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
    >
      {props.value}
    </Text>
  );
}
