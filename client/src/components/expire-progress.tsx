import { useTranslations } from 'next-intl';
import CustomProgress from './custom-progress';
import MomentText from './moment-text';
import DateText from './date-text';
import { Color } from '@/constants/colors';

type Props = {
  value: Date;
  paid?: Date;
};

export default function ExpireProgress(props: Props) {
  const t = useTranslations();

  const now = new Date();
  const value = new Date(props.value);
  const minus7Days = new Date(props.value);
  minus7Days.setDate(minus7Days.getDate() - 7);
  const minus3Days = new Date(props.value);
  minus3Days.setDate(minus3Days.getDate() - 3);

  return (
    <CustomProgress
      color={
        props.paid
          ? Color.GREEN
          : value < now
            ? Color.RED
            : minus3Days < now
              ? Color.YELLOW
              : undefined
      }
      value={props.paid ? value.getTime() : now.getTime()}
      min={minus7Days.getTime()}
      max={value.getTime()}
      label1={
        props.paid ? t('columns.paid') : <MomentText value={props.value} />
      }
      label2={<DateText value={props.paid ?? props.value} />}
    />
  );
}
