import { LuArrowLeftRight } from 'react-icons/lu';
import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomAction from '@/components/custom-action';
import CreateTransferForm from '../forms/create-transfer-form';
import CreateTransactionForm from '../forms/create-transaction-form';
import { Role } from '@/constants/roles';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
};

export default function TransactionsAction(props: Props) {
  return props.tab === 'all' ? (
    <>
      <CustomAction
        action='create'
        dialog='transfer'
        role={Role.ADMIN}
        icon={<LuArrowLeftRight />}
        body={<CreateTransferForm isAll={true} />}
      />
      <CustomAction
        action='create'
        dialog='transaction'
        body={<CreateTransactionForm />}
      />
    </>
  ) : (
    <CustomAction
      action='create'
      dialog='transfer'
      body={<CreateTransferForm isAll={false} />}
    />
  );
}
