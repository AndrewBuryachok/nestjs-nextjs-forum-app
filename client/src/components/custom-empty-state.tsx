import { useTranslations } from 'next-intl';
import {
  LuBanknote,
  LuBellOff,
  LuCalendarDays,
  LuCreditCard,
  LuLandPlot,
  LuMailbox,
  LuReceipt,
  LuShoppingBag,
  LuShoppingBasket,
  LuShoppingCart,
  LuStore,
  LuUsers,
  LuWarehouse,
} from 'react-icons/lu';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { EmptyState } from './ui/empty-state';

type Props = {
  page: keyof typeof PAGE_TABS_MAP | 'notifications';
};

export default function CustomEmptyState(props: Props) {
  const t = useTranslations();

  const icon = {
    cards: <LuCreditCard />,
    fines: <LuReceipt />,
    lockers: <LuMailbox />,
    markets: <LuWarehouse />,
    notifications: <LuBellOff />,
    orders: <LuShoppingBag />,
    plots: <LuLandPlot />,
    products: <LuShoppingBasket />,
    purchases: <LuShoppingCart />,
    rents: <LuCalendarDays />,
    shops: <LuStore />,
    transactions: <LuBanknote />,
    users: <LuUsers />,
  }[props.page];

  return (
    <EmptyState
      icon={icon}
      title={t(`emptyStates.${props.page}.title`)}
      description={t(`emptyStates.${props.page}.description`)}
    />
  );
}
