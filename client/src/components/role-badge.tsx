import { useTranslations } from 'next-intl';
import { Badge } from '@chakra-ui/react';
import { Role } from '@/constants/roles';

type Props = {
  role: Role | 'user';
};

export default function RoleBadge(props: Props) {
  const t = useTranslations();

  const color = {
    admin: 'red',
    banker: 'yellow',
    economist: 'green',
    end: 'purple',
    hub: 'orange',
    inspector: 'blue',
    lor: 'orange',
    president: 'purple',
    spawn: 'green',
    user: undefined,
  }[props.role];

  return <Badge colorPalette={color}>{t(`roles.${props.role}`)}</Badge>;
}
