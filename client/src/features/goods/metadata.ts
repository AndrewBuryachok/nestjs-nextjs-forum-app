import { PAGE_TABS_MAP } from '@/config/navigation';
import { generateMetadata } from '@/lib/metadata';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.goods;
};

export function generateGoodsMetadata(props: Props) {
  return generateMetadata({ page: 'goods', tab: props.tab });
}
