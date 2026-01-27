import { generateCardsMetadata } from '@/features/cards/metadata';
import CardsPage from '@/features/cards/components/cards-page';

export function generateMetadata() {
  return generateCardsMetadata({ tab: 'my' });
}

export default function Page() {
  return <CardsPage tab='my' />;
}
