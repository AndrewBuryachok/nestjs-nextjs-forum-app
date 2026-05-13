import { generateUsersMetadata } from '@/features/users/metadata';
import UsersPage from '@/features/users/components/users-page';

export function generateMetadata() {
  return generateUsersMetadata({ tab: 'all' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <UsersPage tab='all' searchParams={props.searchParams} />;
}
