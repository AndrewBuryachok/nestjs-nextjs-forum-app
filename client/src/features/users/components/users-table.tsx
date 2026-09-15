import { PAGE_TABS_MAP } from '@/config/navigation';
import { User } from '../types';
import CustomTable from '@/components/custom-table';
import CustomAvatarWithUser from '@/components/custom-avatar-with-user';
import RolesBadge from '@/components/roles-badge';
import PlaceText from '@/components/place-text';
import CustomText from '@/components/custom-text';
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
          value: 'town',
          render: (user) =>
            user.town ? (
              <PlaceText place={user.town} />
            ) : (
              <CustomText muted value='-' />
            ),
        },
        {
          value: 'mayor',
          render: (user) =>
            user.town ? (
              <CustomAvatarWithUser user={user.town.user} />
            ) : (
              <CustomText muted value='-' />
            ),
        },
        {
          value: 'online',
          render: (user) => <DateText value={user.onlineAt} />,
        },
        {
          value: 'registered',
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
