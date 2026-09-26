import { BaseRent } from '../types';
import NumberCombobox from '@/components/number-combobox';
import PlaceIcon from '@/components/place-icon';
import PlaceIconWithText from '@/components/place-icon-with-text';

type Props = {
  data?: BaseRent[];
  loading?: boolean;
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
};

export default function RentsCombobox(props: Props) {
  return (
    <NumberCombobox
      data={props.data}
      loading={props.loading}
      empty='rents'
      placeholder={props.placeholder}
      start={(rent) => <PlaceIcon place={rent.plot} />}
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(rent) => rent.plot.name}
      itemToValue={(rent) => rent.id}
      render={(rent) => <PlaceIconWithText place={rent.plot} />}
    />
  );
}
