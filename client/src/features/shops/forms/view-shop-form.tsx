import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Shop } from '../types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import DateInput from '@/components/date-input';

type Props = {
  shop: Shop;
};

export default function ViewShopForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.shop.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.owner')}</Field.Label>
        <CardInput card={props.shop.card} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.shop')}</Field.Label>
        <Input readOnly value={props.shop.name} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.x')}</Field.Label>
        <Input readOnly value={props.shop.x} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.y')}</Field.Label>
        <Input readOnly value={props.shop.y} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.shop.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
