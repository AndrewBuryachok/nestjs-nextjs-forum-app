import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Plot } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import CurrencyInput from '@/components/currency-input';
import DateInput from '@/components/date-input';

type Props = {
  plot: Plot;
};

export default function ViewPlotForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.plot.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.owner')}</Field.Label>
        <CardInput user={props.plot.user} card={props.plot.card} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.plot')}</Field.Label>
        <Input readOnly value={props.plot.name} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.x')}</Field.Label>
        <Input readOnly value={props.plot.x} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.y')}</Field.Label>
        <Input readOnly value={props.plot.y} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.price')}</Field.Label>
        <CurrencyInput value={props.plot.price} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.plot.createdAt} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.renter')}</Field.Label>
        {props.plot.rent ? (
          <CardInput user={props.plot.rent.user} card={props.plot.rent.card} />
        ) : (
          <Input readOnly value='-' />
        )}
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.reserved')}</Field.Label>
        {props.plot.rent ? (
          <DateInput value={props.plot.rent.completedAt} />
        ) : (
          <Input readOnly value='-' />
        )}
      </Field.Root>
    </ViewForm>
  );
}
