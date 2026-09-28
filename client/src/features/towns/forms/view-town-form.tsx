import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Town } from '../types';
import ViewForm from '@/components/view-form';
import UserInput from '@/components/user-input';
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
        <Input readOnly value={props.town.name} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.x')}</Field.Label>
        <Input readOnly value={props.town.x} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.y')}</Field.Label>
        <Input readOnly value={props.town.y} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.town.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
