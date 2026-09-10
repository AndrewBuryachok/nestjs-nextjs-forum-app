import { PAGE_TABS_MAP } from '@/config/navigation';
import { Fine } from '../types';
import { viewFineAction } from '../actions/view-fine-action';
import { payMyFineAction, payUserFineAction } from '../actions/pay-fine-action';
import {
  editMyFineAction,
  editUserFineAction,
} from '../actions/edit-fine-action';
import {
  deleteMyFineAction,
  deleteUserFineAction,
} from '../actions/delete-fine-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.fines;
  fine: Fine;
};

export default function FinesActions(props: Props) {
  const actions = {
    my: [payMyFineAction, editMyFineAction, deleteMyFineAction],
    all: [payUserFineAction, editUserFineAction, deleteUserFineAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewFineAction, ...actions].map((action) => action(props.fine))}
    />
  );
}
