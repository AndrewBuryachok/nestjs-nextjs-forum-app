import { NextIntlClientProvider } from 'next-intl';
import { Box } from '@chakra-ui/react';
import { Provider } from '@/components/ui/provider';
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
            <CustomHeader />
            <Box as='main'>
              <CustomContainer>{props.children}</CustomContainer>
            </Box>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
