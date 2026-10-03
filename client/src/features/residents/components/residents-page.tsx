import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import ResidentsAction from './residents-action';
import ResidentsTable from './residents-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.residents;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ResidentsPage(props: Props) {
  return (
    <CustomPage page='residents' tab={props.tab} action={<ResidentsAction />}>
      <ResidentsTable tab={props.tab} searchParams={props.searchParams} />
    </CustomPage>
  );
}
