import { useTranslations } from 'next-intl';
import { Alert, Flex, HStack, IconButton, Stack } from '@chakra-ui/react';
import { LuArchive } from 'react-icons/lu';
import { ComplaintWithMessages } from '../types';
import BackButton from '@/components/back-button';
import CustomText from '@/components/custom-text';
import MomentText from '@/components/moment-text';

type Props = {
  complaint: ComplaintWithMessages;
};

export default function ComplaintsHeader(props: Props) {
  const t = useTranslations();

  const title = `#${props.complaint.id} ${props.complaint.title}`;

  return (
    <Stack>
      <Flex justify='space-between'>
        <HStack>
          <BackButton />
          <CustomText value={title} />
        </HStack>
        <IconButton
          size='xs'
          variant='ghost'
          disabled={!!props.complaint.closedAt}
        >
          <LuArchive />
        </IconButton>
      </Flex>
      {props.complaint.closedAt && (
        <Alert.Root size='sm' status='error'>
          <Alert.Indicator />
          <Alert.Title>{t('errors.complaint_closed')}</Alert.Title>
          <Alert.Description>
            <MomentText value={props.complaint.closedAt} />
          </Alert.Description>
        </Alert.Root>
      )}
    </Stack>
  );
}
