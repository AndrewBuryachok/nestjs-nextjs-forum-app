import { LuPlus } from 'react-icons/lu';
import { Town } from '../types';
import UpgradeTownForm from '../forms/upgrade-town-form';
import { Color } from '@/constants/colors';

export const upgradeTownFactory = (town: Town, isAll: boolean) => ({
  action: 'upgrade',
  dialog: 'town',
  color: Color.GREEN,
  disabled:
    town.level === Number(process.env.NEXT_PUBLIC_MAX_TOWN_LEVEL) ||
    town.users <
      Number(
        process.env.NEXT_PUBLIC_MIN_TOWN_USERS!.split(',')[town.level - 1],
      ),
  userId: isAll ? 0 : town.user.id,
  icon: <LuPlus />,
  body: <UpgradeTownForm town={town} isAll={isAll} />,
});

export const upgradeMyTownAction = (town: Town) =>
  upgradeTownFactory(town, false);

export const upgradeUserTownAction = (town: Town) =>
  upgradeTownFactory(town, true);
