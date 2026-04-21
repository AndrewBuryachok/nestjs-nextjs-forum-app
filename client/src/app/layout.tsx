import { NextIntlClientProvider } from 'next-intl';
import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/providers/auth-provider';
import { DialogProvider } from '@/providers/dialog-provider';
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
              <DialogProvider>{props.children}</DialogProvider>
            </AuthProvider>
            <Toaster />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
