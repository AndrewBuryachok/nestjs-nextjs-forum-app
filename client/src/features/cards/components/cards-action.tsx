import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateCardForm from '../forms/create-card-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
};

export default function CardsAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='card'
      body={<CreateCardForm isAll={props.tab === 'all'} />}
    />
  );
}
