import { generateInvoicesMetadata } from '@/features/invoices/metadata';
import InvoicesPage from '@/features/invoices/components/invoices-page';

export function generateMetadata() {
  return generateInvoicesMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <InvoicesPage tab='my' searchParams={props.searchParams} />;
}
