import { useTranslations } from 'next-intl';
import { Badge } from '@chakra-ui/react';
import { Color } from '@/constants/colors';

type Props = {
  open: boolean;
};

export default function OpenClosedStatusBadge(props: Props) {
  const t = useTranslations();

  return (
    <Badge colorPalette={props.open ? Color.GREEN : Color.RED}>
      {t(`statuses.${props.open ? 'open' : 'closed'}`)}
    </Badge>
  );
}
