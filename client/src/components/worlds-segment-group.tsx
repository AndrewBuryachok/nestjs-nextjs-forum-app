import { useTranslations } from 'next-intl';
import { SegmentGroup } from '@chakra-ui/react';
import { World } from '@/constants/worlds';

type Props = {
  value: World;
  setValue: (value: World) => void;
};

export default function WorldsSegmentGroup(props: Props) {
  const t = useTranslations();

  const worlds = Object.values(World).map((world) => ({
    value: world,
    label: t(`worlds.${world}`),
  }));

  return (
    <SegmentGroup.Root
      w='full'
      value={props.value}
      onValueChange={({ value }) => props.setValue(value as World)}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items w='full' items={worlds} />
    </SegmentGroup.Root>
  );
}
