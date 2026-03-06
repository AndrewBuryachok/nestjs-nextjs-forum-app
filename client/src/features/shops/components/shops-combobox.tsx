import { BaseShop } from '../types';
import NumberCombobox from '@/components/number-combobox';
import PlaceText from '@/components/place-text';

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
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(shop) => shop.name}
      itemToValue={(shop) => shop.id}
      render={(shop) => <PlaceText place={shop} />}
    />
  );
}
