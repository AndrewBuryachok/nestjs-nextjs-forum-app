import { useTranslations } from 'next-intl';
import { Tabs } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateTransactionForm from '../forms/create-transaction-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
};

export default function TransactionsAction(props: Props) {
  const t = useTranslations();

  const tabs = ['deposit', 'withdraw'];

  return props.tab === 'all' ? (
    <CustomAction
      action='create'
      dialog='transaction'
      body={
        <Tabs.Root fitted lazyMount unmountOnExit defaultValue={tabs[0]}>
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Trigger key={tab} value={tab}>
                {t(`actions.${tab}`)}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {tabs.map((tab, index) => (
            <Tabs.Content key={tab} value={tab}>
              <CreateTransactionForm type={!index} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      }
    />
  ) : null;
}
