import { PAGE_TABS_MAP } from '@/config/navigation';
import { Order } from '../types';
import CustomGallery from '@/components/custom-gallery';
import OrdersCard from './orders-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function OrdersGallery(props: Props) {
  return (
    <CustomGallery<Order>
      page='orders'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(order) => <OrdersCard tab={props.tab} order={order} />}
    />
  );
}
