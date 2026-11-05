import { PAGE_TABS_MAP } from '@/config/navigation';
import { Card } from '../types';
import CustomGallery from '@/components/custom-gallery';
import CardsCard from './cards-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.cards;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function CardsGallery(props: Props) {
  return (
    <CustomGallery<Card>
      page='cards'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(card) => <CardsCard tab={props.tab} card={card} />}
    />
  );
}
