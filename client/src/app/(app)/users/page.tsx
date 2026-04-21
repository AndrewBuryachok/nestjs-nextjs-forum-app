import { generateUsersMetadata } from '@/features/users/metadata';
import UsersPage from '@/features/users/components/users-page';

export function generateMetadata() {
  return generateUsersMetadata({ tab: 'main' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <UsersPage tab='main' searchParams={props.searchParams} />;
}
