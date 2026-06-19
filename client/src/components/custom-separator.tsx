import { HStack, Separator } from '@chakra-ui/react';
import CustomText from './custom-text';

type Props = {
  value: string;
};

export default function CustomSeparator(props: Props) {
  return (
    <HStack>
      <Separator flex='1' />
      <CustomText muted value={props.value} />
      <Separator flex='1' />
    </HStack>
  );
}
