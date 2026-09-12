import { BaseMarket } from '../types';
import NumberCombobox from '@/components/number-combobox';
import PlaceIcon from '@/components/place-icon';
import PlaceIconWithText from '@/components/place-icon-with-text';

type Props = {
  data?: BaseMarket[];
  loading?: boolean;
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
};

export default function MarketsCombobox(props: Props) {
  return (
    <NumberCombobox
      data={props.data}
      loading={props.loading}
      empty='markets'
      placeholder={props.placeholder}
      start={(market) => <PlaceIcon place={market} />}
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(market) => market.name}
      itemToValue={(market) => market.id}
      render={(market) => <PlaceIconWithText place={market} />}
    />
  );
}
