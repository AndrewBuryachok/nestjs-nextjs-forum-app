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
      <CustomAvatar user={props.card.account.user} />
      <div>
        <CustomText value={props.card.account.user.nick} />
        <CustomText muted value={props.card.account.name} />
      </div>
      {'balance' in props.card.account && (
        <CurrencyText value={props.card.account.balance} />
      )}
    </HStack>
  );
}
