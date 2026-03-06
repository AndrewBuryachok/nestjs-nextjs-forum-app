import { BaseShop } from '../types';
import NumberCombobox from '@/components/number-combobox';
import PlaceIcon from '@/components/place-icon';
import PlaceIconWithText from '@/components/place-icon-with-text';

type Props = {
  data?: BaseShop[];
  loading?: boolean;
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
};

export default function ShopsCombobox(props: Props) {
  return (
    <NumberCombobox
      data={props.data}
      loading={props.loading}
      empty='shops'
      placeholder={props.placeholder}
      start={(shop) => <PlaceIcon place={shop} />}
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(shop) => shop.name}
      itemToValue={(shop) => shop.id}
      render={(shop) => <PlaceIconWithText place={shop} />}
    />
  );
}
