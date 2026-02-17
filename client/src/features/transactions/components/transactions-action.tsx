import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomAction from '@/components/custom-action';
import TabsWrapper from '@/components/tabs-wrapper';
import CreateTransferForm from '../forms/create-transfer-form';
import CreateTransactionForm from '../forms/create-transaction-form';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
};

export default function TransactionsAction(props: Props) {
  const tabs = ['deposit', 'withdraw', 'transfer'];

  return props.tab === 'all' ? (
    <CustomAction
      action='create'
      dialog='transaction'
      body={
        <TabsWrapper
          label='actions'
          value={tabs}
          render={(index) =>
            index === tabs.length ? (
              <CreateTransferForm isAll={true} />
            ) : (
              <CreateTransactionForm type={!index} />
            )
          }
        />
      }
    />
  ) : (
    <CustomAction
      action='create'
      dialog='transfer'
      body={<CreateTransferForm isAll={false} />}
    />
  );
}
