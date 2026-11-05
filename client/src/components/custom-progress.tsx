import { Flex, Progress } from '@chakra-ui/react';
import CustomText from './custom-text';
import { Color } from '@/constants/colors';

type Props = {
  color?: Color;
  value: number;
  min?: number;
  max: number;
  label1: React.ReactNode;
  label2?: React.ReactNode;
};

export default function CustomProgress(props: Props) {
  const value = `${props.value}/${props.max}`;

  return (
    <Progress.Root
      colorPalette={props.color}
      size='sm'
      w='full'
      value={props.value}
      min={props.min && Math.min(props.value, props.min)}
      max={Math.max(props.value, props.max)}
    >
      <Flex justify='space-between'>
        <CustomText muted value={props.label1} />
        <CustomText muted value={props.label2 ?? value} />
      </Flex>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  );
}
