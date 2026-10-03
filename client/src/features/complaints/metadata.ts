import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateIdMetadata, generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.complaints;
};

export function generateComplaintsMetadata(props: Props) {
  return generateMetadata({ page: 'complaints', tab: props.tab });
}

export function generateComplaintMetadata(id: string) {
  return generateIdMetadata('complaint', id);
}
