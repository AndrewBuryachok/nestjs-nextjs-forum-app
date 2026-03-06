import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import GoodsAction from './goods-action';
import GoodsTable from './goods-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.goods;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function GoodsPage(props: Props) {
  return (
    <CustomPage
      page='goods'
      tab={props.tab}
      action={<GoodsAction tab={props.tab} />}
      table={<GoodsTable tab={props.tab} searchParams={props.searchParams} />}
    />
  );
}
