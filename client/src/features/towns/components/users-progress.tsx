import { useTranslations } from 'next-intl';
import CustomProgress from '@/components/custom-progress';

type Props = {
  level: number;
  users: number;
};

export default function UsersProgress(props: Props) {
  const t = useTranslations();

  const max = Number(
    process.env.NEXT_PUBLIC_MIN_TOWN_USERS!.split(',')[props.level - 1],
  );

  return (
    <CustomProgress
      value={props.users}
      max={max}
      label1={t('columns.residents')}
    />
  );
}
