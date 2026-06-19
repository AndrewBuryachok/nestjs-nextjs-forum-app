import { Circle, Float } from '@chakra-ui/react';

type Props = {
  isGreen?: boolean;
  isLoading: boolean;
};

export default function FloatCircle(props: Props) {
  const bg = props.isGreen ? 'green.500' : 'red.500';

  return (
    <Float>
      <Circle bg={props.isLoading ? 'fg.muted' : bg} size='2' />
    </Float>
  );
}
