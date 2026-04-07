import { BaseLocker } from '../types';
import NumberCombobox from '@/components/number-combobox';
import PlaceIcon from '@/components/place-icon';
import PlaceIconWithText from '@/components/place-icon-with-text';

type Props = {
  data?: BaseLocker[];
  loading?: boolean;
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
};

export default function LockersCombobox(props: Props) {
  return (
    <NumberCombobox
      data={props.data}
      loading={props.loading}
      empty='lockers'
      placeholder={props.placeholder}
      start={(locker) => <PlaceIcon place={locker} />}
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(locker) => locker.name}
      itemToValue={(locker) => locker.id}
      render={(locker) => <PlaceIconWithText place={locker} />}
    />
  );
}
