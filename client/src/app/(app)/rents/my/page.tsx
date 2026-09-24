import { generateRentsMetadata } from '@/features/rents/metadata';
import RentsPage from '@/features/rents/components/rents-page';

export function generateMetadata() {
  return generateRentsMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <RentsPage tab='my' searchParams={props.searchParams} />;
}
