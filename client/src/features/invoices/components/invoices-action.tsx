import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateInvoiceForm from '../forms/create-invoice-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invoices;
};

export default function InvoicesAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='invoice'
      body={<CreateInvoiceForm isAll={props.tab === 'all'} />}
    />
  );
}
