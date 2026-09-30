'use client';

import { Town } from '../types';
import { useSelectTownUsers } from '../hooks';
import ViewForm from '@/components/view-form';
import UsersList from '@/features/users/components/users-list';

type Props = {
  town: Town;
};

export default function ViewTownUsersForm(props: Props) {
  const users = useSelectTownUsers(props.town.id);

  return (
    <ViewForm>
      <UsersList users={users.data} isLoading={users.isLoading} />
    </ViewForm>
  );
}
