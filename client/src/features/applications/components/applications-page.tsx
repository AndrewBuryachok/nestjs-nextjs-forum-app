import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import SentApplicationsTable from './sent-applications-table';
import ReceivedApplicationsTable from './received-applications-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.applications;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ApplicationsPage(props: Props) {
  return (
    <CustomPage
      page='applications'
      tab={props.tab}
      table={
        props.tab === 'sent' ? (
          <SentApplicationsTable
            tab={props.tab}
            searchParams={props.searchParams}
          />
        ) : (
          <ReceivedApplicationsTable
            tab={props.tab}
            searchParams={props.searchParams}
          />
        )
      }
    />
  );
}
