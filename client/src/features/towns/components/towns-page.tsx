import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import TownsTable from './towns-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function TownsPage(props: Props) {
  return (
    <CustomPage
      page='towns'
      tab={props.tab}
      table={<TownsTable tab={props.tab} searchParams={props.searchParams} />}
    />
  );
}
