import { generateFinesMetadata } from '@/features/fines/metadata';
import FinesPage from '@/features/fines/components/fines-page';

export function generateMetadata() {
  return generateFinesMetadata({ tab: 'paid' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <FinesPage tab='paid' searchParams={props.searchParams} />;
}
