import { generateCardsMetadata } from '@/features/cards/metadata';
import CardsPage from '@/features/cards/components/cards-page';

export function generateMetadata() {
  return generateCardsMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <CardsPage tab='my' searchParams={props.searchParams} />;
}
