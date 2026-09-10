import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Fine } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import UserInput from '@/components/user-input';
import CurrencyInput from '@/components/currency-input';
import DateInput from '@/components/date-input';

type Props = {
  fine: Fine;
};

export default function ViewFineForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.fine.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.sender')}</Field.Label>
        <CardInput user={props.fine.senderUser} card={props.fine.senderCard} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.receiver')}</Field.Label>
        {props.fine.receiverCard ? (
          <CardInput
            user={props.fine.receiverUser}
            card={props.fine.receiverCard}
          />
        ) : (
          <UserInput user={props.fine.receiverUser} />
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.sum')}</Field.Label>
        <CurrencyInput value={props.fine.sum} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.description')}</Field.Label>
        <Input readOnly value={props.fine.description || '-'} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.fine.createdAt} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.paid')}</Field.Label>
        {props.fine.paidAt ? (
          <DateInput value={props.fine.paidAt} />
        ) : (
          <Input readOnly value='-' />
        )}
      </Field.Root>
    </ViewForm>
  );
}
