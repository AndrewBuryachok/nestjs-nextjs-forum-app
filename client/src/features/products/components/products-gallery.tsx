import { PAGE_TABS_MAP } from '@/config/navigation';
import { Product } from '../types';
import CustomGallery from '@/components/custom-gallery';
import ProductsCard from './products-card';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.products;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ProductsGallery(props: Props) {
  return (
    <CustomGallery<Product>
      page='products'
      tab={props.tab}
      searchParams={props.searchParams}
      render={(product) => <ProductsCard tab={props.tab} product={product} />}
    />
  );
}
