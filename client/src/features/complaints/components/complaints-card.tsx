import { useTranslations } from 'next-intl';
import { Card, HStack, SimpleGrid } from '@chakra-ui/react';
import { LuGavel } from 'react-icons/lu';
import { Complaint } from '../types';
import CardWrapper from '@/components/card-wrapper';
import SquareIcon from '@/components/square-icon';
import CustomText from '@/components/custom-text';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import OpenClosedStatusBadge from '@/components/open-closed-status-badge';
import MomentText from '@/components/moment-text';

type Props = {
  complaint: Complaint;
};

export default function ComplaintsCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <HStack>
          <SquareIcon>
            <LuGavel />
          </SquareIcon>
          <CustomText
            bold
            value={'#' + props.complaint.id + ' ' + props.complaint.title}
          />
        </HStack>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={2}>
          <CustomAvatarWithText
            user={props.complaint.senderUser}
            value={t('columns.sender')}
          />
          <CustomAvatarWithText
            user={props.complaint.receiverUser}
            value={t('columns.receiver')}
          />
        </SimpleGrid>
      </Card.Body>
      <Card.Footer>
        <OpenClosedStatusBadge open={!props.complaint.closedAt} />
        <CustomText
          muted
          value={<MomentText value={props.complaint.createdAt} />}
        />
      </Card.Footer>
    </CardWrapper>
  );
}
