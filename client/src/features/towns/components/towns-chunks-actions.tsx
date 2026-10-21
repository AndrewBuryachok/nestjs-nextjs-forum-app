import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../types';
import { viewTownChunksAction } from '../actions/view-town-chunks-action';
import {
  addMyTownChunkAction,
  addUserTownChunkAction,
} from '../actions/add-town-chunk-action';
import {
  removeMyTownChunkAction,
  removeUserTownChunkAction,
} from '../actions/remove-town-chunk-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  town: Town;
};

export default function TownsChunksActions(props: Props) {
  const actions = {
    main: [viewTownChunksAction],
    my: [addMyTownChunkAction, viewTownChunksAction, removeMyTownChunkAction],
    all: [
      addUserTownChunkAction,
      viewTownChunksAction,
      removeUserTownChunkAction,
    ],
  }[props.tab];

  return (
    <CustomActions actions={actions.map((action) => action(props.town))} />
  );
}
