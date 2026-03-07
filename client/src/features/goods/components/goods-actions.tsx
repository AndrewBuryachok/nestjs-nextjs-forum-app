import { PAGE_TABS_MAP } from '@/config/navigation';
import { Good } from '../types';
import { viewGoodAction } from '../actions/view-good-action';
import {
  editMyGoodAction,
  editUserGoodAction,
} from '../actions/edit-good-action';
import {
  deleteMyGoodAction,
  deleteUserGoodAction,
} from '../actions/delete-good-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.goods;
  good: Good;
};

export default function GoodsActions(props: Props) {
  const actions = {
    main: [],
    my: [editMyGoodAction, deleteMyGoodAction],
    all: [editUserGoodAction, deleteUserGoodAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewGoodAction, ...actions].map((action) => action(props.good))}
    />
  );
}
