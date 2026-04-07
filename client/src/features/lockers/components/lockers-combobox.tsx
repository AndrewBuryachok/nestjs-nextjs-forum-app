import { BaseLocker } from '../types';
import NumberCombobox from '@/components/number-combobox';
import PlaceText from '@/components/place-text';

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
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(locker) => locker.name}
      itemToValue={(locker) => locker.id}
      render={(locker) => <PlaceText place={locker} />}
    />
  );
}
