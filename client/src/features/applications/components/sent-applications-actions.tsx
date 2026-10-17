import { Town } from '../../towns/types';
import { viewTownAction } from '../../towns/actions/view-town-action';
import { deleteApplicationAction } from '../actions/delete-application-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  town: Town;
};

export default function SentApplicationsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewTownAction, deleteApplicationAction].map((action) =>
        action(props.town),
      )}
    />
  );
}
