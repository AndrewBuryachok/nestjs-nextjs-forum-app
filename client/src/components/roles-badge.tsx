import { HStack } from '@chakra-ui/react';
import RoleBadge from './role-badge';
import { Role } from '@/constants/roles';

type Props = {
  roles: Role[];
};

export default function RolesBadge(props: Props) {
  return (
    <HStack>
      {props.roles.map((role) => (
        <RoleBadge key={role} role={role} />
      ))}
      {!props.roles.length && <RoleBadge role='user' />}
    </HStack>
  );
}
