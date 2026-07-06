import { PAGE_TABS_MAP } from '@/config/navigation';
import { Invoice } from '../types';
import { viewInvoiceAction } from '../actions/view-invoice-action';
import {
  payMyInvoiceAction,
  payUserInvoiceAction,
} from '../actions/pay-invoice-action';
import {
  editMyInvoiceAction,
  editUserInvoiceAction,
} from '../actions/edit-invoice-action';
import {
  deleteMyInvoiceAction,
  deleteUserInvoiceAction,
} from '../actions/delete-invoice-action';
import CustomActions from '@/components/custom-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invoices;
  invoice: Invoice;
};

export default function InvoicesActions(props: Props) {
  const actions = {
    my: [payMyInvoiceAction, editMyInvoiceAction, deleteMyInvoiceAction],
    all: [payUserInvoiceAction, editUserInvoiceAction, deleteUserInvoiceAction],
  }[props.tab];

  return (
    <CustomActions
      actions={[viewInvoiceAction, ...actions].map((action) =>
        action(props.invoice),
      )}
    />
  );
}
