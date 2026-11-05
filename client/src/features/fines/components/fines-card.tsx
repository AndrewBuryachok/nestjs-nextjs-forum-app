import { useTranslations } from 'next-intl';
import { Card, Flex, HStack, SimpleGrid } from '@chakra-ui/react';
import { LuReceipt } from 'react-icons/lu';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Fine } from '../types';
import CardWrapper from '@/components/card-wrapper';
import SquareIcon from '@/components/square-icon';
import CustomText from '@/components/custom-text';
import CurrencyText from '@/components/currency-text';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import ExpireProgress from '@/components/expire-progress';
import FinesActions from './fines-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.fines;
  fine: Fine;
};

export default function FinesCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <Flex justify='space-between'>
          <HStack>
            <SquareIcon>
              <LuReceipt />
            </SquareIcon>
            <CustomText bold value={props.fine.description} />
          </HStack>
          <CurrencyText value={props.fine.sum} />
        </Flex>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={2}>
          <CustomAvatarWithText
            user={props.fine.senderUser}
            value={t('columns.payee')}
          />
          <CustomAvatarWithText
            user={props.fine.receiverUser}
            value={t('columns.payer')}
          />
        </SimpleGrid>
      </Card.Body>
      <Card.Footer>
        <ExpireProgress
          value={props.fine.completedAt}
          paid={props.fine.paidAt}
        />
      </Card.Footer>
      <Card.Footer justifyContent='flex-end'>
        <FinesActions tab={props.tab} fine={props.fine} />
      </Card.Footer>
    </CardWrapper>
  );
}
