import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import { viewTownAction } from '../actions/view-town-action';
import {
  upgradeMyTownAction,
  upgradeUserTownAction,
} from '../actions/upgrade-town-action';
import {
  editMyTownAction,
  editUserTownAction,
} from '../actions/edit-town-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  town: Town;
};

export default function TownsActions(props: Props) {
  const actions = {
    main: [],
    my: [upgradeMyTownAction, editMyTownAction],
    all: [upgradeUserTownAction, editUserTownAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewTownAction, ...actions].map((action) => action(props.town))}
    />
  );
}
