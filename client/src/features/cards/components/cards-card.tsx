import { useTranslations } from 'next-intl';
import { Card, Flex, HStack } from '@chakra-ui/react';
import { LuCreditCard } from 'react-icons/lu';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Card as CardType } from '../types';
import CardWrapper from '@/components/card-wrapper';
import SquareIcon from '@/components/square-icon';
import CustomText from '@/components/custom-text';
import CurrencyText from '@/components/currency-text';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import CardsActions from './cards-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
  card: CardType;
};

export default function CardsCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <Flex justify='space-between'>
          <HStack>
            <SquareIcon>
              <LuCreditCard />
            </SquareIcon>
            <CustomText bold value={props.card.name} />
          </HStack>
          <CurrencyText value={props.card.balance} />
        </Flex>
      </Card.Header>
      <Card.Body>
        <CustomAvatarWithText
          user={props.card.user}
          value={t('columns.owner')}
        />
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <CardsActions tab={props.tab} card={props.card} />
      </Card.Footer>
    </CardWrapper>
  );
}
