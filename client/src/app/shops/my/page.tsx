import { generateShopsMetadata } from '@/features/shops/metadata';
import ShopsPage from '@/features/shops/components/shops-page';

export function generateMetadata() {
  return generateShopsMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <ShopsPage tab='my' searchParams={props.searchParams} />;
}
