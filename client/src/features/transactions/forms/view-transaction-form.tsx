import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Transaction } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import UserInput from '@/components/user-input';
import CurrencyInput from '@/components/currency-input';
import DateInput from '@/components/date-input';

type Props = {
  transaction: Transaction;
};

export default function ViewTransactionForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.transaction.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.sender')}</Field.Label>
        {props.transaction.senderCard ? (
          <CardInput card={props.transaction.senderCard} />
        ) : (
          <UserInput user={props.transaction.executorUser!} />
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.receiver')}</Field.Label>
        {props.transaction.receiverCard ? (
          <CardInput card={props.transaction.receiverCard} />
        ) : (
          <UserInput user={props.transaction.executorUser!} />
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.sum')}</Field.Label>
        <CurrencyInput value={props.transaction.sum} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.description')}</Field.Label>
        <Input readOnly value={props.transaction.description || '-'} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.transaction.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
