import { generateProductsMetadata } from '@/features/products/metadata';
import ProductsPage from '@/features/products/components/products-page';

export function generateMetadata() {
  return generateProductsMetadata({ tab: 'my' });
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Page(props: Props) {
  return <ProductsPage tab='my' searchParams={props.searchParams} />;
}
