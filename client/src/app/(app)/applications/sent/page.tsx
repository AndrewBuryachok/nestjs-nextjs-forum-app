import { generateApplicationsMetadata } from '@/features/applications/metadata';
import ApplicationsPage from '@/features/applications/components/applications-page';

export function generateMetadata() {
  return generateApplicationsMetadata({ tab: 'sent' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <ApplicationsPage tab='sent' searchParams={props.searchParams} />;
}
