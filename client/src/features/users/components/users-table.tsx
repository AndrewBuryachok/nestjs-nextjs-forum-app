import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import RolesBadge from '@/components/roles-badge';
import DateText from '@/components/date-text';
import UsersActions from './users-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.users;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function UsersTable(props: Props) {
  return (
    <CustomTable<User>
      page='users'
      tab={props.tab}
      searchParams={props.searchParams}
      columns={[
        {
          value: 'user',
          render: (user) => <CustomAvatarWithUser user={user} />,
        },
        {
          value: 'roles',
          render: (user) => <RolesBadge roles={user.roles} />,
        },
        {
          value: 'created',
          render: (user) => <DateText value={user.createdAt} />,
        },
        {
          value: 'actions',
          render: (user) => <UsersActions tab={props.tab} user={user} />,
        },
      ]}
    />
  );
}
