import { PAGE_TABS_MAP } from '@/config/navigation';
import { Shop } from '../types';
import { viewShopAction } from '../actions/view-shop-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.shops;
  shop: Shop;
};

export default function ShopsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewShopAction].map((action) => action(props.shop))}
    />
  );
}
