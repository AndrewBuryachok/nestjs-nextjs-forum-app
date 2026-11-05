import { PAGE_TABS_MAP } from '@/config/navigation';
import { Town } from '../../towns/types';
import CustomGallery from '@/components/custom-gallery';
import SentApplicationsCard from './sent-applications-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.applications;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function SentApplicationsGallery(props: Props) {
  return (
    <CustomGallery<Town>
      page='applications'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(town) => <SentApplicationsCard town={town} />}
    />
  );
}
