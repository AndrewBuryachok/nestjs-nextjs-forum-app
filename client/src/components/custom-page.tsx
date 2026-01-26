import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomHeading from './custom-heading';
import CustomTabs from './custom-tabs';

type Props = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
};

export default function CustomPage(props: Props) {
  return (
    <>
      <CustomHeading page={props.page} />
      <CustomTabs page={props.page} tab={props.tab} />
    </>
  );
}
