import { generatePurchasesMetadata } from '@/features/purchases/metadata';
import PurchasesPage from '@/features/purchases/components/purchases-page';

export function generateMetadata() {
  return generatePurchasesMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <PurchasesPage tab='my' searchParams={props.searchParams} />;
}
