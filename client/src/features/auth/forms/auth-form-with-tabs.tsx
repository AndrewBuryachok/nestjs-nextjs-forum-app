import { useTranslations } from 'next-intl';
import { Tabs } from '@chakra-ui/react';
import AuthForm from './auth-form';

export default function AuthFormWithTabs() {
  const t = useTranslations();

  const tabs = ['login', 'register'];

  return (
    <Tabs.Root fitted lazyMount unmountOnExit defaultValue={tabs[0]}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab} value={tab}>
            {t(`actions.${tab}`)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab, index) => (
        <Tabs.Content key={tab} value={tab}>
          <AuthForm isLogin={!index} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
