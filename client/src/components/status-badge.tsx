import { useTranslations } from 'next-intl';
import { Badge } from '@chakra-ui/react';
import { Status } from '@/constants/statuses';
import { Color } from '@/constants/colors';

type Props = {
  status: Status;
};

export default function StatusBadge(props: Props) {
  const t = useTranslations();

  const color = {
    created: Color.RED,
    taken: Color.YELLOW,
    executed: Color.GREEN,
    completed: Color.BLUE,
  }[props.status];

  return <Badge colorPalette={color}>{t(`statuses.${props.status}`)}</Badge>;
}
