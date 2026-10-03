import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import LicensesAction from './licenses-action';
import LicensesGallery from './licenses-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.licenses;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function LicensesPage(props: Props) {
  return (
    <CustomPage
      page='licenses'
      tab={props.tab}
      action={<LicensesAction />}
      gallery={
        <LicensesGallery tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
