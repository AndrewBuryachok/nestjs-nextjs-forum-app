import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Rent } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import PlaceInput from '@/components/place-input';
import CurrencyInput from '@/components/currency-input';
import DateInput from '@/components/date-input';

type Props = {
  rent: Rent;
};

export default function ViewRentForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.rent.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.renter')}</Field.Label>
        <CardInput user={props.rent.user} card={props.rent.card} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.owner')}</Field.Label>
        <CardInput user={props.rent.plot.user} card={props.rent.plot.card} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.plot')}</Field.Label>
        <PlaceInput place={props.rent.plot} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.price')}</Field.Label>
        <CurrencyInput value={props.rent.plot.price} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.rent.createdAt} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.completed')}</Field.Label>
        <DateInput value={props.rent.completedAt} />
      </Field.Root>
    </ViewForm>
  );
}
