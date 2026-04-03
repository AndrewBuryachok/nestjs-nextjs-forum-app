import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import OrdersTable from './orders-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function OrdersPage(props: Props) {
  return (
    <CustomPage
      page='orders'
      tab={props.tab}
      table={<OrdersTable tab={props.tab} searchParams={props.searchParams} />}
    />
  );
}
