import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import FinesAction from './fines-action';
import FinesTable from './fines-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.fines;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function FinesPage(props: Props) {
  return (
    <CustomPage
      page='fines'
      tab={props.tab}
      action={<FinesAction tab={props.tab} />}
      table={<FinesTable tab={props.tab} searchParams={props.searchParams} />}
    />
  );
}
