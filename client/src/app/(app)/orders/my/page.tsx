import { generateOrdersMetadata } from '@/features/orders/metadata';
import OrdersPage from '@/features/orders/components/orders-page';

export function generateMetadata() {
  return generateOrdersMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <OrdersPage tab='my' searchParams={props.searchParams} />;
}
