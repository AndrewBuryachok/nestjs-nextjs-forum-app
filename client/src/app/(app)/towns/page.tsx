import { generateTownsMetadata } from '@/features/towns/metadata';
import TownsPage from '@/features/towns/components/towns-page';

export function generateMetadata() {
  return generateTownsMetadata({ tab: 'main' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <TownsPage tab='main' searchParams={props.searchParams} />;
}
