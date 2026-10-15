import { generateResidentsMetadata } from '@/features/residents/metadata';
import ResidentsPage from '@/features/residents/components/residents-page';

export function generateMetadata() {
  return generateResidentsMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <ResidentsPage tab='my' searchParams={props.searchParams} />;
}
