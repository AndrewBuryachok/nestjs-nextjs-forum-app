import { BaseTown } from '../types';
import NumberCombobox from '@/components/number-combobox';
import PlaceIcon from '@/components/place-icon';
import PlaceIconWithText from '@/components/place-icon-with-text';

type Props = {
  data?: BaseTown[];
  loading?: boolean;
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
};

export default function TownsCombobox(props: Props) {
  return (
    <NumberCombobox
      data={props.data}
      loading={props.loading}
      empty='towns'
      placeholder={props.placeholder}
      start={(town) => <PlaceIcon place={town} />}
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(town) => town.name}
      itemToValue={(town) => town.id}
      render={(town) => <PlaceIconWithText place={town} />}
    />
  );
}
