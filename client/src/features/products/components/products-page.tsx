import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomPage from '@/components/custom-page';
import ProductsAction from './products-action';
import ProductsGallery from './products-gallery';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.products;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ProductsPage(props: Props) {
  return (
    <CustomPage
      page='products'
      tab={props.tab}
      action={<ProductsAction tab={props.tab} />}
      gallery={
        <ProductsGallery tab={props.tab} searchParams={props.searchParams} />
      }
    />
  );
}
