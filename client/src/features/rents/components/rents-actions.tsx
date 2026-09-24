import { PAGE_TABS_MAP } from '@/config/navigation';
import { Rent } from '../types';
import { viewRentAction } from '../actions/view-rent-action';
import {
  continueMyRentAction,
  continueUserRentAction,
} from '../actions/continue-rent-action';
import {
  completeMyRentAction,
  completeUserRentAction,
} from '../actions/complete-rent-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.rents;
  rent: Rent;
};

export default function RentsActions(props: Props) {
  const actions = {
    main: [],
    my: [continueMyRentAction, completeMyRentAction],
    completed: [],
    all: [continueUserRentAction, completeUserRentAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewRentAction, ...actions].map((action) => action(props.rent))}
    />
  );
}
