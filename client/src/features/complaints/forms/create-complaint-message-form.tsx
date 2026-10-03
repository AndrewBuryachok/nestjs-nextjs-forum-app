import { useTranslations } from 'next-intl';
import { IconButton, InputGroup, Textarea } from '@chakra-ui/react';
import { LuSend } from 'react-icons/lu';
import { ComplaintWithMessages } from '../types';

type Props = {
  complaint: ComplaintWithMessages;
};

export default function CreateComplaintMessageForm(props: Props) {
  const t = useTranslations();

  return (
    <InputGroup
      endAddon={
        <IconButton
          size='2xs'
          variant='ghost'
          disabled={!!props.complaint.closedAt}
        >
          <LuSend />
        </IconButton>
      }
    >
      <Textarea
        autoresize
        placeholder={t('columns.message')}
        disabled={!!props.complaint.closedAt}
      />
    </InputGroup>
  );
}
