import { useTranslations } from 'next-intl';
import { Badge } from '@chakra-ui/react';
import { Role } from '@/constants/roles';
import { Color } from '@/constants/colors';

type Props = {
  role: Role | 'user';
};

export default function RoleBadge(props: Props) {
  const t = useTranslations();

  const color = {
    admin: Color.RED,
    user: undefined,
  }[props.role];

  return <Badge colorPalette={color}>{t(`roles.${props.role}`)}</Badge>;
}
