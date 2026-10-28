import { PAGE_TABS_MAP } from '@/config/navigation';
import { Fine } from '../types';
import { viewFineAction } from '../actions/view-fine-action';
import { payFineAction } from '../actions/pay-fine-action';
import { editFineAction } from '../actions/edit-fine-action';
import { deleteFineAction } from '../actions/delete-fine-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.fines;
  fine: Fine;
};

export default function FinesActions(props: Props) {
  const actions = {
    my: [payFineAction],
    paid: [],
    all: [editFineAction, deleteFineAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewFineAction, ...actions].map((action) => action(props.fine))}
    />
  );
}
