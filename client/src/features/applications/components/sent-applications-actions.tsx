import { Town } from '../../towns/types';
import { viewTownAction } from '../../towns/actions/view-town-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  town: Town;
};

export default function SentApplicationsActions(props: Props) {
  return (
    <CustomActions
      actions={[viewTownAction].map((action) => action(props.town))}
    />
  );
}
