import './globals.css';

import { Inter } from 'next/font/google';
import { HydrateClient } from '@/trpc/server';

import { Providers } from '@/components/providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased `}>
        <Providers>
          <HydrateClient>{children}</HydrateClient>
        </Providers>
      </body>
    </html>
  );
}
