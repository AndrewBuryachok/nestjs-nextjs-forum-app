import { PAGE_TABS_MAP } from '@/config/navigation';
import { Purchase } from '../types';
import { viewPurchaseAction } from '../actions/view-purchase-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.purchases;
  purchase: Purchase;
};

export default function PurchasesActions(props: Props) {
  return (
    <CustomActions
      actions={[viewPurchaseAction].map((action) => action(props.purchase))}
    />
  );
}
