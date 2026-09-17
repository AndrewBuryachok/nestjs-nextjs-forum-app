import { generateLandmarksMetadata } from '@/features/landmarks/metadata';
import LandmarksPage from '@/features/landmarks/components/landmarks-page';

export function generateMetadata() {
  return generateLandmarksMetadata({ tab: 'all' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <LandmarksPage tab='all' searchParams={props.searchParams} />;
}
