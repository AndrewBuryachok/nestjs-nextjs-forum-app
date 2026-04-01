import { generateLockersMetadata } from '@/features/lockers/metadata';
import LockersPage from '@/features/lockers/components/lockers-page';

export function generateMetadata() {
  return generateLockersMetadata({ tab: 'all' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <LockersPage tab='all' searchParams={props.searchParams} />;
}
