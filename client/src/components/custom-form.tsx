import { useTranslations } from 'next-intl';
import { Button, Stack } from '@chakra-ui/react';

type Props = {
  disabled?: boolean;
  loading: boolean;
  onSubmit: () => void;
  children?: React.ReactNode;
};

export default function CustomForm(props: Props) {
  const t = useTranslations();

  return (
    <form onSubmit={props.onSubmit}>
      <Stack>
        {props.children}
        <Button type='submit' disabled={props.disabled} loading={props.loading}>
          {t('buttons.submit')}
        </Button>
      </Stack>
    </form>
  );
}
