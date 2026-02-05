'use client';

import { createContext, useContext, useState } from 'react';
import { CloseButton, Dialog, Portal } from '@chakra-ui/react';

type DialogConfig = {
  title: string;
  body: React.ReactNode;
};

type DialogContextType = {
  openDialog: (config: DialogConfig) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function DialogProvider(props: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState<React.ReactNode>(null);

  const openDialog = (config: DialogConfig) => {
    setOpen(true);
    setTitle(config.title);
    setBody(config.body);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {props.children}
      <Dialog.Root
        lazyMount
        trapFocus={false}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>{body}</Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size='xs' />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </DialogContext.Provider>
  );
}

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
}
