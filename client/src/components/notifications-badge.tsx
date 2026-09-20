import { Circle } from '@chakra-ui/react';

type Props = {
  value: number;
};

export default function NotificationsBadge(props: Props) {
  if (!props.value) {
    return null;
  }

  return (
    <Circle bg='red.500' color='white' fontSize='2xs' size='4'>
      {props.value > 9 ? '9+' : props.value}
    </Circle>
  );
}
