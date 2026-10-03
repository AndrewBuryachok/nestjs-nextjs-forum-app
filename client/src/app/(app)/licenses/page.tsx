import { generateLicensesMetadata } from '@/features/licenses/metadata';
import LicensesPage from '@/features/licenses/components/licenses-page';

export function generateMetadata() {
  return generateLicensesMetadata({ tab: 'main' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <LicensesPage tab='main' searchParams={props.searchParams} />;
}
