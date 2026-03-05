import { useTranslations } from 'next-intl';
import { Input, InputGroup } from '@chakra-ui/react';
import ItemImage from './item-image';
import { Item } from '@/constants/items';

type Props = {
  item: Item;
};

export default function ItemInput(props: Props) {
  const t = useTranslations();

  return (
    <InputGroup startAddon={<ItemImage item={props.item} />}>
      <Input readOnly value={t(`items.${props.item}`)} />
    </InputGroup>
  );
}
