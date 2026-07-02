import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Invoice } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import UserInput from '@/components/user-input';
import CurrencyInput from '@/components/currency-input';
import DateInput from '@/components/date-input';

type Props = {
  invoice: Invoice;
};

export default function ViewInvoiceForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.invoice.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.sender')}</Field.Label>
        <CardInput
          user={props.invoice.senderUser}
          card={props.invoice.senderCard}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.receiver')}</Field.Label>
        {props.invoice.receiverCard ? (
          <CardInput
            user={props.invoice.receiverUser}
            card={props.invoice.receiverCard}
          />
        ) : (
          <UserInput user={props.invoice.receiverUser} />
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.sum')}</Field.Label>
        <CurrencyInput value={props.invoice.sum} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.description')}</Field.Label>
        <Input readOnly value={props.invoice.description || '-'} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.invoice.createdAt} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.paid')}</Field.Label>
        {props.invoice.paidAt ? (
          <DateInput value={props.invoice.paidAt} />
        ) : (
          <Input readOnly value='-' />
        )}
      </Field.Root>
    </ViewForm>
  );
}
