import { NextIntlClientProvider } from 'next-intl';
import { Box, Stack } from '@chakra-ui/react';
import { Provider } from '@/components/ui/provider';
import { DialogProvider } from '@/providers/dialog-provider';
import CustomHeader from '@/components/custom-header';
import CustomContainer from '@/components/custom-container';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang='uk' suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <Provider>
            <DialogProvider>
              <CustomHeader />
              <Box as='main'>
                <CustomContainer>
                  <Stack>{props.children}</Stack>
                </CustomContainer>
              </Box>
            </DialogProvider>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
