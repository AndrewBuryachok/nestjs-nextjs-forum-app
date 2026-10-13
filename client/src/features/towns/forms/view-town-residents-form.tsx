'use client';

import { Town } from '../types';
import { useSelectTownResidents } from '../hooks';
import ViewForm from '@/components/view-form';
import UsersList from '@/features/users/components/users-list';

type Props = {
  town: Town;
};

export default function ViewTownResidentsForm(props: Props) {
  const users = useSelectTownResidents(props.town.id);

  return (
    <ViewForm>
      <UsersList users={users.data} isLoading={users.isLoading} />
    </ViewForm>
  );
}
