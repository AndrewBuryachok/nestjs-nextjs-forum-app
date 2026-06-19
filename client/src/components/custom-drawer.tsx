import { CloseButton, Drawer, Portal } from '@chakra-ui/react';

type Props = {
  placement: 'start' | 'end';
  title: string;
  body: React.ReactNode;
  children: React.ReactNode;
};

export default function CustomDrawer(props: Props) {
  return (
    <Drawer.Root placement={props.placement}>
      <Drawer.Trigger asChild>{props.children}</Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{props.title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{props.body}</Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size='xs' />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
