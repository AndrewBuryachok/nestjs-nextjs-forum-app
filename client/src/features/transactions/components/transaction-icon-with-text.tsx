import { useTranslations } from 'next-intl';
import { HStack } from '@chakra-ui/react';
import {
  LuArrowDownLeft,
  LuArrowLeftRight,
  LuArrowUpRight,
  LuCalendarDays,
  LuLandPlot,
  LuReceipt,
} from 'react-icons/lu';
import ItemImage from '@/components/item-image';
import SquareIcon from '@/components/square-icon';
import CustomText from '@/components/custom-text';
import { TransactionType } from '@/constants/transaction-types';
import { Item } from '@/constants/items';

type Props = {
  type: TransactionType;
  description: string;
  item?: Item;
};

export default function TransactionIconWithText(props: Props) {
  const t = useTranslations();

  const icon = {
    deposit: <LuArrowDownLeft />,
    withdraw: <LuArrowUpRight />,
    transfer: <LuArrowLeftRight />,
    pay_fine: <LuReceipt />,
    reserve_plot: <LuLandPlot />,
    continue_rent: <LuCalendarDays />,
    create_order: undefined,
    edit_order: undefined,
    delete_order: undefined,
    execute_order: undefined,
    complete_order: undefined,
  }[props.type];

  return (
    <HStack>
      {props.item ? (
        <ItemImage item={props.item} />
      ) : (
        <SquareIcon>{icon}</SquareIcon>
      )}
      {props.description ? (
        <div>
          <CustomText bold value={t(`transactionTypes.${props.type}`)} />
          <CustomText muted value={props.description} />
        </div>
      ) : (
        <CustomText bold value={t(`transactionTypes.${props.type}`)} />
      )}
    </HStack>
  );
}
