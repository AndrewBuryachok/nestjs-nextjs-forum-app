import { useTranslations } from 'next-intl';
import CustomProgress from '@/components/custom-progress';
import { Status } from '@/constants/statuses';

type Props = {
  status: Status;
};

export default function StatusProgress(props: Props) {
  const t = useTranslations();

  const statuses = Object.values(Status);
  const value = statuses.indexOf(props.status) + 1;
  const max = statuses.length;

  return (
    <CustomProgress
      value={value}
      max={max}
      label1={t(`statuses.${props.status}`)}
    />
  );
}
