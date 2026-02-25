'use client';

import { Card } from '../types';
import { useSelectCardUsers } from '../hooks';
import ViewForm from '@/components/view-form';
import UsersList from '@/features/users/components/users-list';

type Props = {
  card: Card;
};

export default function ViewCardUsersForm(props: Props) {
  const users = useSelectCardUsers(props.card.id);

  return (
    <ViewForm>
      <UsersList users={users.data} isLoading={users.isLoading} />
    </ViewForm>
  );
}
