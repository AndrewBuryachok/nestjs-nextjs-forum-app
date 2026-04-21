import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { Shop } from '@/features/shops/types';
import { Locker } from '@/features/lockers/types';
import ViewForm from '@/components/view-form';
import CardInput from '@/components/card-input';
import UserInput from '@/components/user-input';
import DateInput from '@/components/date-input';

type Props = {
  place: Shop | Locker;
  type: 'shop' | 'locker';
};

export default function ViewPlaceForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.place.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.owner')}</Field.Label>
        {'card' in props.place && <CardInput card={props.place.card} />}
        {'user' in props.place && <UserInput user={props.place.user} />}
      </Field.Root>
      <Field.Root>
        <Field.Label>{t(`columns.${props.type}`)}</Field.Label>
        <Input readOnly value={props.place.name} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.x')}</Field.Label>
        <Input readOnly value={props.place.x} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.y')}</Field.Label>
        <Input readOnly value={props.place.y} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.place.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
