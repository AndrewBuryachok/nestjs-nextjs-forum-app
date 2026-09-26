import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Product } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import ItemInput from '@/components/item-input';
import AmountInput from '@/components/amount-input';
import CurrencyInput from '@/components/currency-input';
import PlaceInput from '@/components/place-input';
import DateInput from '@/components/date-input';

type Props = {
  product: Product;
};

export default function ViewProductForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.product.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.seller')}</Field.Label>
        <CardInput user={props.product.user} card={props.product.card} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.item')}</Field.Label>
        <ItemInput item={props.product.item} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.description')}</Field.Label>
        <Input readOnly value={props.product.description || '-'} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.amount')}</Field.Label>
        <AmountInput
          value={[
            props.product.amount,
            props.product.batch,
            props.product.unit,
          ]}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.price')}</Field.Label>
        <CurrencyInput value={props.product.price} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.shop')}</Field.Label>
        <PlaceInput place={props.product.shop ?? props.product.rent!.plot} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.product.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
