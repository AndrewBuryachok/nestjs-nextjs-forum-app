import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Town } from '../types';
import ViewForm from '@/components/view-form';
import UserInput from '@/components/user-input';
import PlaceInput from '@/components/place-input';
import DateInput from '@/components/date-input';

type Props = {
  town: Town;
};

export default function ViewTownForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.town.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.mayor')}</Field.Label>
        <UserInput user={props.town.user} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.town')}</Field.Label>
        <PlaceInput place={props.town} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.town.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
