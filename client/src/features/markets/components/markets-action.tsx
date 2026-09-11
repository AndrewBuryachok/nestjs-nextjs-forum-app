import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateMarketForm from '../forms/create-market-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.markets;
};

export default function MarketsAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='market'
      body={<CreateMarketForm isAll={props.tab === 'all'} />}
    />
  );
}
