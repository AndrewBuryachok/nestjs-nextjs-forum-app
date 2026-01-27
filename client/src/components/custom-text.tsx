import { Text } from '@chakra-ui/react';

type Props = {
  muted?: boolean;
  value: string;
};

export default function CustomText(props: Props) {
  if (props.muted) {
    return (
      <Text color='fg.muted' fontSize='xs'>
        {props.value}
      </Text>
    );
  }

  return <Text>{props.value}</Text>;
}
