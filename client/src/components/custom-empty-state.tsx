import { useTranslations } from 'next-intl';
import {
  LuBanknote,
  LuBellOff,
  LuBuilding,
  LuCalendarDays,
  LuCreditCard,
  LuIdCard,
  LuLandmark,
  LuLandPlot,
  LuMail,
  LuMailbox,
  LuReceipt,
  LuShoppingBag,
  LuShoppingBasket,
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
    applications: <LuMail />,
    cards: <LuCreditCard />,
    fines: <LuReceipt />,
    invitations: <LuMail />,
    landmarks: <LuLandmark />,
    licenses: <LuIdCard />,
    lockers: <LuMailbox />,
    notifications: <LuBellOff />,
    orders: <LuShoppingBag />,
    plots: <LuLandPlot />,
    products: <LuShoppingBasket />,
    rents: <LuCalendarDays />,
    residents: <LuUsers />,
    shops: <LuStore />,
    towns: <LuBuilding />,
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
