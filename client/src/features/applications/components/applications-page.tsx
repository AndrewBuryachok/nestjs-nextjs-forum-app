import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import ApplicationsAction from './applications-action';
import SentApplicationsGallery from './sent-applications-gallery';
import ReceivedApplicationsGallery from './received-applications-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.applications;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ApplicationsPage(props: Props) {
  return (
    <CustomPage
      page='applications'
      tab={props.tab}
      action={<ApplicationsAction tab={props.tab} />}
      gallery={
        props.tab === 'sent' ? (
          <SentApplicationsGallery
            tab={props.tab}
            searchParams={props.searchParams}
          />
        ) : (
          <ReceivedApplicationsGallery
            tab={props.tab}
            searchParams={props.searchParams}
          />
        )
      }
    />
  );
}
