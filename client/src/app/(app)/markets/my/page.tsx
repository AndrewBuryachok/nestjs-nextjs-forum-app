import { generateMarketsMetadata } from '@/features/markets/metadata';
import MarketsPage from '@/features/markets/components/markets-page';

export function generateMetadata() {
  return generateMarketsMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <MarketsPage tab='my' searchParams={props.searchParams} />;
}
