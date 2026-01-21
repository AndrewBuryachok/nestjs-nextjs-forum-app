import { NextIntlClientProvider } from 'next-intl';
import { Provider } from '@/components/ui/provider';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang='uk' suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <Provider>{props.children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
