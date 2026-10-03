import { ButtonGroup, Flex } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import CustomHeading from './custom-heading';
import SearchButton from './search-button';
import SortButton from './sort-button';
import CustomTabs from './custom-tabs';

type Props = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export default function CustomPage(props: Props) {
  return (
    <>
      <Flex justify='space-between'>
        <CustomHeading page={props.page} />
        <ButtonGroup attached size='xs' variant='ghost'>
          {props.action}
          <SearchButton />
          <SortButton />
        </ButtonGroup>
      </Flex>
      <CustomTabs page={props.page} tab={props.tab} />
      {props.children}
    </>
  );
}
