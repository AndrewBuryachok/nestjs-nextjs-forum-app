import { useTranslations } from 'next-intl';
import {
  LuBanknote,
  LuBellOff,
  LuCreditCard,
  LuMailbox,
  LuReceipt,
  LuShoppingBag,
  LuShoppingBasket,
  LuShoppingCart,
  LuStore,
  LuUsers,
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
    invoices: <LuReceipt />,
    lockers: <LuMailbox />,
    notifications: <LuBellOff />,
    orders: <LuShoppingBag />,
    products: <LuShoppingBasket />,
    purchases: <LuShoppingCart />,
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
