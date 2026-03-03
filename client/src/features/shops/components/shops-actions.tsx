import { PAGE_TABS_MAP } from '@/config/navigation';
import { Shop } from '../types';
import { viewShopAction } from '../actions/view-shop-action';
import {
  editMyShopAction,
  editUserShopAction,
} from '../actions/edit-shop-action';
import {
  deleteMyShopAction,
  deleteUserShopAction,
} from '../actions/delete-shop-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.shops;
  shop: Shop;
};

export default function ShopsActions(props: Props) {
  const actions = {
    main: [],
    my: [editMyShopAction, deleteMyShopAction],
    all: [editUserShopAction, deleteUserShopAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewShopAction, ...actions].map((action) => action(props.shop))}
    />
  );
}
