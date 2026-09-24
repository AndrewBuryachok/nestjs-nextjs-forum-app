import { PAGE_TABS_MAP } from '@/config/navigation';
import { Rent } from '../types';
import { viewRentAction } from '../actions/view-rent-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.rents;
  rent: Rent;
};

export default function RentsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewRentAction].map((action) => action(props.rent))}
    />
  );
}
