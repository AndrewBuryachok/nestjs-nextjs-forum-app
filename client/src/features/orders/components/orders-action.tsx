import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateOrderForm from '../forms/create-order-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.orders;
};

export default function OrdersAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='order'
      body={<CreateOrderForm isAll={props.tab === 'all'} />}
    />
  );
}
