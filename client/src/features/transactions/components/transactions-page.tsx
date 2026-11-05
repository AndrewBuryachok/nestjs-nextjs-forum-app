import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import TransactionsAction from './transactions-action';
import TransactionsGallery from './transactions-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.transactions;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function TransactionsPage(props: Props) {
  return (
    <CustomPage
      page='transactions'
      tab={props.tab}
      action={<TransactionsAction tab={props.tab} />}
      gallery={
        <TransactionsGallery
          tab={props.tab}
          searchParams={props.searchParams}
        />
      }
    />
  );
}
