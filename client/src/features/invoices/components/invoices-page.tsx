import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import InvoicesAction from './invoices-action';
import InvoicesTable from './invoices-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.invoices;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function InvoicesPage(props: Props) {
  return (
    <CustomPage
      page='invoices'
      tab={props.tab}
      action={<InvoicesAction tab={props.tab} />}
      table={
        <InvoicesTable tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
