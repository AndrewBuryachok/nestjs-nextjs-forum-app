import { useTranslations } from 'next-intl';
import { SegmentGroup } from '@chakra-ui/react';
import { Unit } from '@/constants/units';

type Props = {
  value: Unit;
  setValue: (value: Unit) => void;
};

export default function UnitsSegmentGroup(props: Props) {
  const t = useTranslations();

  const units = Object.values(Unit).map((unit) => ({
    value: unit,
    label: t(`units.${unit}`),
  }));

  return (
    <SegmentGroup.Root
      w='full'
      value={props.value}
      onValueChange={({ value }) => props.setValue(value as Unit)}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Items w='full' items={units} />
    </SegmentGroup.Root>
  );
}
