import { useTranslations } from 'next-intl';
import { Card, Flex, SimpleGrid } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Transaction } from '../types';
import CardWrapper from '@/components/card-wrapper';
import TransactionIconWithText from './transaction-icon-with-text';
import CurrencyText from '@/components/currency-text';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import BankIconWithText from '@/components/bank-icon-with-text';
import TransactionsActions from './transactions-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
  transaction: Transaction;
};

export default function TransactionsCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <Flex justify='space-between'>
          <TransactionIconWithText
            type={props.transaction.type}
            description={props.transaction.description}
            item={props.transaction.item}
          />
          <CurrencyText value={props.transaction.sum} />
        </Flex>
      </Card.Header>
      <Card.Body>
        <SimpleGrid columns={2}>
          {props.transaction.senderUser && props.transaction.senderCard ? (
            <CustomAvatarWithText
              user={props.transaction.senderUser}
              value={t('columns.sender')}
            />
          ) : props.transaction.executorUser ? (
            <CustomAvatarWithText
              user={props.transaction.executorUser}
              value={t('columns.banker')}
            />
          ) : (
            <BankIconWithText />
          )}
          {props.transaction.receiverUser && props.transaction.receiverCard ? (
            <CustomAvatarWithText
              user={props.transaction.receiverUser}
              value={t('columns.receiver')}
            />
          ) : props.transaction.executorUser ? (
            <CustomAvatarWithText
              user={props.transaction.executorUser}
              value={t('columns.banker')}
            />
          ) : (
            <BankIconWithText />
          )}
        </SimpleGrid>
      </Card.Body>
      <Card.Footer justifyContent='flex-end'>
        <TransactionsActions tab={props.tab} transaction={props.transaction} />
      </Card.Footer>
    </CardWrapper>
  );
}
