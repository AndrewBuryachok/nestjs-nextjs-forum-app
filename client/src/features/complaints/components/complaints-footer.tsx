'use client';

import { useTranslations } from 'next-intl';
import { Alert } from '@chakra-ui/react';
import { ComplaintWithMessages } from '../types';
import { useAuthContext } from '@/providers/auth-provider';
import CreateComplaintMessageForm from '../forms/create-complaint-message-form';

type Props = {
  complaint: ComplaintWithMessages;
};

export default function ComplaintsFooter(props: Props) {
  const t = useTranslations();

  const { user } = useAuthContext();

  if (!user) {
    return (
      <Alert.Root size='sm' status='neutral'>
        <Alert.Indicator />
        <Alert.Title>{t('errors.not_complaint_user')}</Alert.Title>
      </Alert.Root>
    );
  }

  return <CreateComplaintMessageForm complaint={props.complaint} />;
}
