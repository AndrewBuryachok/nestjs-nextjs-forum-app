import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Landmark } from '../types';
import ViewForm from '@/components/view-form';
import UserInput from '@/components/user-input';
import DateInput from '@/components/date-input';

type Props = {
  landmark: Landmark;
};

export default function ViewLandmarkForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.landmark.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.responsible')}</Field.Label>
        <UserInput user={props.landmark.user} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.landmark')}</Field.Label>
        <Input readOnly value={props.landmark.name} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.x')}</Field.Label>
        <Input readOnly value={props.landmark.x} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.y')}</Field.Label>
        <Input readOnly value={props.landmark.y} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.landmark.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
