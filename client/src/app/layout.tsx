import { NextIntlClientProvider } from 'next-intl';
import { Box, Stack } from '@chakra-ui/react';
import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/providers/auth-provider';
import { DialogProvider } from '@/providers/dialog-provider';
import CustomHeader from '@/components/custom-header';
import CustomContainer from '@/components/custom-container';
import { verifySession } from '@/lib/session';

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout(props: Props) {
  const session = await verifySession();

  return (
    <html lang='uk' suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <Provider>
            <AuthProvider user={session && session.user}>
              <DialogProvider>
                <CustomHeader />
                <Box as='main'>
                  <CustomContainer>
                    <Stack>{props.children}</Stack>
                  </CustomContainer>
                </Box>
              </DialogProvider>
            </AuthProvider>
            <Toaster />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
