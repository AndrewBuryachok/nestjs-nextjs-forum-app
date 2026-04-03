import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Order } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import ItemInput from '@/components/item-input';
import AmountInput from '@/components/amount-input';
import CurrencyInput from '@/components/currency-input';
import StatusBadge from '@/components/status-badge';
import PlaceInput from '@/components/place-input';
import DateInput from '@/components/date-input';

type Props = {
  order: Order;
};

export default function ViewOrderForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.order.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.customer')}</Field.Label>
        <CardInput card={props.order.customerCard} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.item')}</Field.Label>
        <ItemInput item={props.order.item} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.description')}</Field.Label>
        <Input readOnly value={props.order.description || '-'} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.amount')}</Field.Label>
        <AmountInput
          value={[props.order.amount, props.order.batch, props.order.unit]}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.sum')}</Field.Label>
        <CurrencyInput value={props.order.sum} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.status')}</Field.Label>
        <StatusBadge status={props.order.status} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.executor')}</Field.Label>
        {props.order.executorCard ? (
          <CardInput card={props.order.executorCard} />
        ) : (
          <Input readOnly value='-' />
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.locker')}</Field.Label>
        <PlaceInput place={props.order.locker} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.order.createdAt} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.completed')}</Field.Label>
        {props.order.completedAt ? (
          <DateInput value={props.order.completedAt} />
        ) : (
          <Input readOnly value='-' />
        )}
      </Field.Root>
    </ViewForm>
  );
}
