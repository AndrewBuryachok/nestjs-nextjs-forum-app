import { PAGE_TABS_MAP } from '@/config/navigation';
import { Market } from '../types';
import { viewMarketAction } from '../actions/view-market-action';
import {
  editMyMarketAction,
  editUserMarketAction,
} from '../actions/edit-market-action';
import {
  deleteMyMarketAction,
  deleteUserMarketAction,
} from '../actions/delete-market-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.markets;
  market: Market;
};

export default function MarketsActions(props: Props) {
  const actions = {
    main: [],
    my: [editMyMarketAction, deleteMyMarketAction],
    all: [editUserMarketAction, deleteUserMarketAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewMarketAction, ...actions].map((action) =>
        action(props.market),
      )}
    />
  );
}
