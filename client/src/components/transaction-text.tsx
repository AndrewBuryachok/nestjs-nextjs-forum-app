import { useTranslations } from 'next-intl';
import CustomText from './custom-text';
import { TransactionType } from '@/constants/transaction-types';

type Props = {
  type: TransactionType;
  description: string;
};

export default function TransactionText(props: Props) {
  const t = useTranslations();

  return props.description ? (
    <div>
      <CustomText muted value={t(`transactionTypes.${props.type}`)} />
      <CustomText muted value={props.description} />
    </div>
  ) : (
    <CustomText muted value={t(`transactionTypes.${props.type}`)} />
  );
}
