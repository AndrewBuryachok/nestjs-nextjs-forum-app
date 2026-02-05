import { HStack } from '@chakra-ui/react';
import { SelectCard, SelectCardWithBalance } from '@/features/cards/types';
import CustomAvatar from './custom-avatar';
import CustomText from './custom-text';
import CurrencyText from './currency-text';

type Props = {
  card: SelectCard | SelectCardWithBalance;
};

export default function SelectAvatarWithCard(props: Props) {
  return (
    <HStack>
      <CustomAvatar user={props.card.user} />
      <div>
        <CustomText value={props.card.user.nick} />
        <CustomText muted value={props.card.name} />
      </div>
      {'balance' in props.card && <CurrencyText value={props.card.balance} />}
    </HStack>
  );
}
