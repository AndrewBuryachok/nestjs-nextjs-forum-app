import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import CardsAction from './cards-action';
import CardsGallery from './cards-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function CardsPage(props: Props) {
  return (
    <CustomPage
      page='cards'
      tab={props.tab}
      action={<CardsAction tab={props.tab} />}
      gallery={
        <CardsGallery tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
