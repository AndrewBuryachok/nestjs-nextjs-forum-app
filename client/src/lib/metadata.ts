import { getTranslations } from 'next-intl/server';
import { PAGE_TABS_MAP } from '@/config/navigation';

type Props = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
};

export async function generateMetadata(props: Props) {
  const t = await getTranslations();
  return { title: `${t(`tabs.${props.tab}`)} ${t(`pages.${props.page}`)}` };
}
