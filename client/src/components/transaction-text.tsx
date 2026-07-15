import { useTranslations } from 'next-intl';
import { HStack } from '@chakra-ui/react';
import ItemImage from './item-image';
import BankIcon from './bank-icon';
import CustomText from './custom-text';
import { TransactionType } from '@/constants/transaction-types';
import { Item } from '@/constants/items';

type Props = {
  type: TransactionType;
  description: string;
  item?: Item;
};

export default function TransactionText(props: Props) {
  const t = useTranslations();

  return (
    <HStack>
      {props.item ? <ItemImage item={props.item} /> : <BankIcon />}
      {props.description ? (
        <div>
          <CustomText muted value={t(`transactionTypes.${props.type}`)} />
          <CustomText muted value={props.description} />
        </div>
      ) : (
        <CustomText muted value={t(`transactionTypes.${props.type}`)} />
      )}
    </HStack>
  );
}
