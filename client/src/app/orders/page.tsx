import { generateOrdersMetadata } from '@/features/orders/metadata';
import OrdersPage from '@/features/orders/components/orders-page';

export function generateMetadata() {
  return generateOrdersMetadata({ tab: 'main' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <OrdersPage tab='main' searchParams={props.searchParams} />;
}
