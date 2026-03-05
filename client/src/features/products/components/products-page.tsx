import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import ProductsTable from './products-table';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.products;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ProductsPage(props: Props) {
  return (
    <CustomPage
      page='products'
      tab={props.tab}
      table={
        <ProductsTable tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
