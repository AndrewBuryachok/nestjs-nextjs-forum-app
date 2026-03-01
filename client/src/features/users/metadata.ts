import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.users;
};

export function generateUsersMetadata(props: Props) {
  return generateMetadata({ page: 'users', tab: props.tab });
}
