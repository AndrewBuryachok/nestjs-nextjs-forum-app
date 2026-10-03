import { generateComplaintsMetadata } from '@/features/complaints/metadata';
import ComplaintsPage from '@/features/complaints/components/complaints-page';

export function generateMetadata() {
  return generateComplaintsMetadata({ tab: 'closed' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <ComplaintsPage tab='closed' searchParams={props.searchParams} />;
}
