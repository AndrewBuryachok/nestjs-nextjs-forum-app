import { useTranslations } from 'next-intl';
import { HStack } from '@chakra-ui/react';
import ItemImage from './item-image';
import CustomText from './custom-text';
import { Item } from '@/constants/items';

type Props = {
  item: Item;
  description: string;
};

export default function ItemImageWithText(props: Props) {
  const t = useTranslations();

  return (
    <HStack>
      <ItemImage item={props.item} />
      {props.description ? (
        <div>
          <CustomText value={t(`items.${props.item}`)} />
          <CustomText muted value={props.description} />
        </div>
      ) : (
        <CustomText value={t(`items.${props.item}`)} />
      )}
    </HStack>
  );
}
