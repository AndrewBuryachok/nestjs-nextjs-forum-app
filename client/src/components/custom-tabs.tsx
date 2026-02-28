import { Tabs } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';
import TabsTrigger from './tabs-trigger';

type Props = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
};

export default function CustomTabs(props: Props) {
  const tabs = Object.entries(PAGE_TABS_MAP[props.page]);

  return (
    <Tabs.Root value={props.tab}>
      <Tabs.List>
        {tabs.map(([key, value]) => (
          <TabsTrigger
            key={key}
            page={props.page}
            tab={key}
            roles={'roles' in value ? value.roles : []}
          />
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
