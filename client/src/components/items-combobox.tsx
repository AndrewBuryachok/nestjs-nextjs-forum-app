import { useTranslations } from 'next-intl';
import CustomCombobox from './custom-combobox';
import ItemImage from './item-image';
import ItemImageWithText from './item-image-with-text';
import { Item } from '@/constants/items';

type Props = {
  value: Item;
  setValue: (item: Item) => void;
};

export default function ItemsCombobox(props: Props) {
  const t = useTranslations();

  return (
    <CustomCombobox
      data={Object.values(Item)}
      empty='items'
      placeholder={t('columns.item')}
      start={(item) => <ItemImage item={item} />}
      value={props.value ? props.value : ''}
      setValue={(value) => props.setValue(value as Item)}
      itemToLabel={(item) => t(`items.${item}`)}
      itemToValue={(item) => item}
      render={(item) => <ItemImageWithText item={item} description='' />}
    />
  );
}
