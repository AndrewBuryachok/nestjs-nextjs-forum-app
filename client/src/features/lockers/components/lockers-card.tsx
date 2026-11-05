import { useTranslations } from 'next-intl';
import { Card } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import { Locker } from '../types';
import CardWrapper from '@/components/card-wrapper';
import PlaceIconWithText from '@/components/place-icon-with-text';
import CustomAvatarWithText from '@/components/custom-avatar-with-text';
import CellsProgress from './cells-progress';
import LockersActions from './lockers-actions';

type Props = {
  tab: keyof typeof PAGE_TABS_MAP.lockers;
  locker: Locker;
};

export default function LockersCard(props: Props) {
  const t = useTranslations();

  return (
    <CardWrapper>
      <Card.Header>
        <PlaceIconWithText place={props.locker} />
      </Card.Header>
      <Card.Body>
        <CustomAvatarWithText
          user={props.locker.user}
          value={t('columns.owner')}
        />
      </Card.Body>
      <Card.Footer>
        <CellsProgress
          cells={props.locker.cells}
          orders={props.locker.orders}
        />
      </Card.Footer>
      <Card.Footer justifyContent='flex-end'>
        <LockersActions tab={props.tab} locker={props.locker} />
      </Card.Footer>
    </CardWrapper>
  );
}
