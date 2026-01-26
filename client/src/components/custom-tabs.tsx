import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Tabs } from '@chakra-ui/react';
import { PAGE_TABS_MAP } from '@/config/navigation';

type Props = {
  page: keyof typeof PAGE_TABS_MAP;
  tab: string;
};

export default function CustomTabs(props: Props) {
  const t = useTranslations();

  const tabs = Object.keys(PAGE_TABS_MAP[props.page]);

  return (
    <Tabs.Root value={props.tab}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab} asChild value={tab}>
            <Link href={`/${props.page}/${tab}`}>{t(`tabs.${tab}`)}</Link>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
