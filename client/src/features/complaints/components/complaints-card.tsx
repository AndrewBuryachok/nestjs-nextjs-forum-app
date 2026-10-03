import { Card, HStack, VStack } from '@chakra-ui/react';
import { LuChevronRight } from 'react-icons/lu';
import { Complaint } from '../types';
import CustomAvatar from '@/components/custom-avatar';
import CustomText from '@/components/custom-text';
import SquareIcon from '@/components/square-icon';
import OpenClosedStatusBadge from '@/components/open-closed-status-badge';
import MomentText from '@/components/moment-text';

type Props = {
  complaint: Complaint;
};

export default function ComplaintsCard(props: Props) {
  return (
    <>
      <Card.Header>
        <Card.Title>
          #{props.complaint.id} {props.complaint.title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <HStack>
          <VStack gap='0'>
            <CustomAvatar user={props.complaint.senderUser} />
            <CustomText value={props.complaint.senderUser.nick} />
          </VStack>
          <SquareIcon>
            <LuChevronRight />
          </SquareIcon>
          <VStack gap='0'>
            <CustomAvatar user={props.complaint.receiverUser} />
            <CustomText value={props.complaint.receiverUser.nick} />
          </VStack>
        </HStack>
      </Card.Body>
      <Card.Footer>
        <OpenClosedStatusBadge open={!props.complaint.closedAt} />
        <Card.Description>
          <MomentText value={props.complaint.createdAt} />
        </Card.Description>
      </Card.Footer>
    </>
  );
}
