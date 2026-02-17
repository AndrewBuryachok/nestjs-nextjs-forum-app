import { useTranslations } from 'next-intl';
import { Tabs } from '@chakra-ui/react';

type Props = {
  label: string;
  value: string[];
  render: (index: number) => React.ReactNode;
};

export default function TabsWrapper(props: Props) {
  const t = useTranslations();

  return (
    <Tabs.Root fitted lazyMount unmountOnExit defaultValue={props.value[0]}>
      <Tabs.List>
        {props.value.map((tab, index) => (
          <Tabs.Trigger key={tab} value={tab}>
            {t(`${props.label}.${tab}`)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {props.value.map((tab, index) => (
        <Tabs.Content key={tab} value={tab}>
          {props.render(index)}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
