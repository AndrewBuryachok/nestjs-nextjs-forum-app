import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateGoodForm from '../forms/create-good-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.goods;
};

export default function GoodsAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='good'
      body={<CreateGoodForm isAll={props.tab === 'all'} />}
    />
  );
}
