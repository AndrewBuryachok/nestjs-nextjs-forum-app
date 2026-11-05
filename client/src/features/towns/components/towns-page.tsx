import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import TownsAction from './towns-action';
import TownsGallery from './towns-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.towns;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function TownsPage(props: Props) {
  return (
    <CustomPage
      page='towns'
      tab={props.tab}
      action={<TownsAction tab={props.tab} />}
      gallery={
        <TownsGallery tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
