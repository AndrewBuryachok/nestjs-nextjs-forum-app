import { Stack } from '@chakra-ui/react';
import CloseDialogButton from './close-dialog-button';

type Props = {
  children: React.ReactNode;
};

export default function ViewForm(props: Props) {
  return (
    <Stack>
      {props.children}
      <CloseDialogButton />
    </Stack>
  );
}
