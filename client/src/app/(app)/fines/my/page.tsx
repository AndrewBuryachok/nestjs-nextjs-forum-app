import { generateFinesMetadata } from '@/features/fines/metadata';
import FinesPage from '@/features/fines/components/fines-page';

export function generateMetadata() {
  return generateFinesMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <FinesPage tab='my' searchParams={props.searchParams} />;
}
