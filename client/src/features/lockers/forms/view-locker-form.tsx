import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Locker } from '../types';
import ViewForm from '@/components/view-form';
import UserInput from '@/components/user-input';
import PlaceInput from '@/components/place-input';
import DateInput from '@/components/date-input';

type Props = {
  locker: Locker;
};

export default function ViewLockerForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.locker.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.owner')}</Field.Label>
        <UserInput user={props.locker.user} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.locker')}</Field.Label>
        <PlaceInput place={props.locker} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.cells')}</Field.Label>
        <Input
          readOnly
          value={`${props.locker.cells - props.locker.orders}/${props.locker.cells}`}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.locker.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
