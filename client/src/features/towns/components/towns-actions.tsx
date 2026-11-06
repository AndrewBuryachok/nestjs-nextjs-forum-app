import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import { viewTownAction } from '../actions/view-town-action';
import { viewTownResidentsAction } from '../actions/view-town-residents-action';
import { viewTownChunksAction } from '../actions/view-town-chunks-action';
import {
  upgradeMyTownAction,
  upgradeUserTownAction,
} from '../actions/upgrade-town-action';
import {
  addMyTownChunkAction,
  addUserTownChunkAction,
} from '../actions/add-town-chunk-action';
import {
  removeMyTownChunkAction,
  removeUserTownChunkAction,
} from '../actions/remove-town-chunk-action';
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
    my: [
      upgradeMyTownAction,
      addMyTownChunkAction,
      removeMyTownChunkAction,
      editMyTownAction,
    ],
    all: [
      upgradeUserTownAction,
      addUserTownChunkAction,
      removeUserTownChunkAction,
      editUserTownAction,
    ],
  }[props.tab];

  return (
    <CustomActions
      actions={[
        viewTownAction,
        viewTownResidentsAction,
        viewTownChunksAction,
        ...actions,
      ].map((action) => action(props.town))}
    />
  );
}
