import { SelectCardWithBalance } from '../types';
import NumberCombobox from '@/components/number-combobox';
import CurrencyText from '@/components/currency-text';
import SelectAvatarWithCard from '@/components/select-avatar-with-card';

type Props = {
  data?: SelectCardWithBalance[];
  loading?: boolean;
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
};

export default function CardsWithBalanceCombobox(props: Props) {
  return (
    <NumberCombobox
      data={props.data}
      loading={props.loading}
      empty='cards'
      placeholder={props.placeholder}
      start={(card) => <CurrencyText value={card.account.balance} />}
      value={props.value}
      setValue={props.setValue}
      itemToLabel={(card) => card.account.name}
      itemToValue={(card) => card.id}
      render={(card) => <SelectAvatarWithCard card={card} />}
    />
  );
}
