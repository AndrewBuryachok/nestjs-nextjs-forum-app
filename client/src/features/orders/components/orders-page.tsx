import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import OrdersAction from './orders-action';
import OrdersGallery from './orders-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function OrdersPage(props: Props) {
  return (
    <CustomPage
      page='orders'
      tab={props.tab}
      action={<OrdersAction tab={props.tab} />}
      gallery={
        <OrdersGallery tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
