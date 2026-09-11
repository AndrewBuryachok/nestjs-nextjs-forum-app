import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Market } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import DateInput from '@/components/date-input';

type Props = {
  market: Market;
};

export default function ViewMarketForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.market.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.owner')}</Field.Label>
        <CardInput user={props.market.user} card={props.market.card} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.market')}</Field.Label>
        <Input readOnly value={props.market.name} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.x')}</Field.Label>
        <Input readOnly value={props.market.x} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.y')}</Field.Label>
        <Input readOnly value={props.market.y} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.market.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
