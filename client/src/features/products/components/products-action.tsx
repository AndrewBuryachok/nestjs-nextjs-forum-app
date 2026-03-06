import { PAGE_TABS_MAP } from '@/config/navigation';
import CreateProductForm from '../forms/create-product-form';
import CustomAction from '@/components/custom-action';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.products;
};

export default function ProductsAction(props: Props) {
  return (
    <CustomAction
      action='create'
      dialog='product'
      body={<CreateProductForm isAll={props.tab === 'all'} />}
    />
  );
}
