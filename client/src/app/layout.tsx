import { NextIntlClientProvider } from 'next-intl';
import { Provider } from '@/components/ui/provider';
import CustomHeader from '@/components/custom-header';

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
            {props.children}
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
