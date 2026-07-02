import { PAGE_TABS_MAP } from '@/config/navigation';
import { Invoice } from '../types';
import { viewInvoiceAction } from '../actions/view-invoice-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invoices;
  invoice: Invoice;
};

export default function InvoicesActions(props: Props) {
  return (
    <CustomActions
      actions={[viewInvoiceAction].map((action) => action(props.invoice))}
    />
  );
}
