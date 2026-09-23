import { generatePlotsMetadata } from '@/features/plots/metadata';
import PlotsPage from '@/features/plots/components/plots-page';

export function generateMetadata() {
  return generatePlotsMetadata({ tab: 'main' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <PlotsPage tab='main' searchParams={props.searchParams} />;
}
