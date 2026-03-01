import { useTranslations } from 'next-intl';
import { Field, Input } from '@chakra-ui/react';
import { User } from '../types';
import ViewForm from '@/components/view-form';
import UserInput from '@/components/user-input';
import RolesBadge from '@/components/roles-badge';
import DateInput from '@/components/date-input';

type Props = {
  user: User;
};

export default function ViewUserForm(props: Props) {
  const t = useTranslations();

  return (
    <ViewForm>
      <Field.Root>
        <Field.Label>{t('columns.id')}</Field.Label>
        <Input readOnly value={props.user.id} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.user')}</Field.Label>
        <UserInput user={props.user} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.roles')}</Field.Label>
        <RolesBadge roles={props.user.roles} />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t('columns.created')}</Field.Label>
        <DateInput value={props.user.createdAt} />
      </Field.Root>
    </ViewForm>
  );
}
