import { PAGE_TABS_MAP } from '@/config/navigation';
import { Good } from '../types';
import { viewGoodAction } from '../actions/view-good-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.goods;
  good: Good;
};

export default function GoodsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewGoodAction].map((action) => action(props.good))}
    />
  );
}
