import TabsWrapper from '@/components/tabs-wrapper';
import AuthForm from './auth-form';

export default function AuthFormWithTabs() {
  const tabs = ['login', 'register'];

  return (
    <TabsWrapper
      label='actions'
      value={tabs}
      render={(index) => <AuthForm isLogin={!index} />}
    />
  );
}
