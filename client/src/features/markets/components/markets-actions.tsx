import { PAGE_TABS_MAP } from '@/config/navigation';
import { Market } from '../types';
import { viewMarketAction } from '../actions/view-market-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.markets;
  market: Market;
};

export default function MarketsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewMarketAction].map((action) => action(props.market))}
    />
  );
}
