import { generateGoodsMetadata } from '@/features/goods/metadata';
import GoodsPage from '@/features/goods/components/goods-page';

export function generateMetadata() {
  return generateGoodsMetadata({ tab: 'main' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <GoodsPage tab='main' searchParams={props.searchParams} />;
}
