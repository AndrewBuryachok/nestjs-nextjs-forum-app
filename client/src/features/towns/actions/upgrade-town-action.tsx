import { LuPlus } from 'react-icons/lu';
import { Town } from '../types';
import UpgradeTownForm from '../forms/upgrade-town-form';
import { Color } from '@/constants/colors';

export const upgradeTownAction = (town: Town) => ({
  action: 'upgrade',
  dialog: 'town',
  color: Color.GREEN,
  disabled: town.level === Number(process.env.NEXT_PUBLIC_MAX_TOWN_LEVEL),
  icon: <LuPlus />,
  body: <UpgradeTownForm town={town} />,
});
