import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateShopForm from '../forms/create-shop-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.shops;
};

export default function ShopsAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='shop'
      body={<CreateShopForm isAll={props.tab === 'all'} />}
    />
  );
}
