import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Purchase } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import ItemInput from '@/components/item-input';
import AmountInput from '@/components/amount-input';
import CurrencyInput from '@/components/currency-input';
import PlaceInput from '@/components/place-input';
import DateInput from '@/components/date-input';

type Props = {
  purchase: Purchase;
};

export default function ViewPurchaseForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.purchase.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.buyer')}</Field.Label>
        <CardInput user={props.purchase.user} card={props.purchase.card} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.seller')}</Field.Label>
        <CardInput
          user={props.purchase.product.user}
          card={props.purchase.product.card}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.item')}</Field.Label>
        <ItemInput item={props.purchase.product.item} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.description')}</Field.Label>
        <Input readOnly value={props.purchase.product.description || '-'} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.amount')}</Field.Label>
        <AmountInput
          value={[
            props.purchase.amount,
            props.purchase.product.batch,
            props.purchase.product.unit,
          ]}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.price')}</Field.Label>
        <CurrencyInput value={props.purchase.price} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.shop')}</Field.Label>
        <PlaceInput
          place={
            props.purchase.product.shop ?? props.purchase.product.rent!.plot
          }
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.purchase.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
