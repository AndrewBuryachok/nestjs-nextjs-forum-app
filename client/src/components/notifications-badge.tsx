import { Badge } from '@chakra-ui/react';

type Props = {
  value: number;
};

export default function NotificationsBadge(props: Props) {
  if (!props.value) {
    return null;
  }

  return (
    <Badge borderRadius='full' colorPalette='red' variant='solid'>
      {props.value}
    </Badge>
  );
}
