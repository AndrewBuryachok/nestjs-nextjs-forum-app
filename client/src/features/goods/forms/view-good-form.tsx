import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Good } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import ItemInput from '@/components/item-input';
import AmountInput from '@/components/amount-input';
import CurrencyInput from '@/components/currency-input';
import PlaceInput from '@/components/place-input';
import DateInput from '@/components/date-input';

type Props = {
  good: Good;
};

export default function ViewGoodForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.good.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.seller')}</Field.Label>
        <CardInput card={props.good.shop.card} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.item')}</Field.Label>
        <ItemInput item={props.good.item} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.description')}</Field.Label>
        <Input readOnly value={props.good.description || '-'} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.amount')}</Field.Label>
        <AmountInput
          value={[props.good.amount, props.good.batch, props.good.unit]}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.price')}</Field.Label>
        <CurrencyInput value={props.good.price} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.shop')}</Field.Label>
        <PlaceInput place={props.good.shop} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.good.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
