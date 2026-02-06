import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Card } from '../types';
import ViewForm from '@/components/view-form';
import UserInput from '@/components/user-input';
import CurrencyInput from '@/components/currency-input';
import DateInput from '@/components/date-input';

type Props = {
  card: Card;
};

export default function ViewCardForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.card.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.owner')}</Field.Label>
        <UserInput user={props.card.account.user} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.card')}</Field.Label>
        <Input readOnly value={props.card.account.name} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.balance')}</Field.Label>
        <CurrencyInput value={props.card.account.balance} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.card.account.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
