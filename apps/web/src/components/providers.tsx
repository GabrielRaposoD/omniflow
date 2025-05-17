'use client';

import type * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { TRPCReactProvider } from '@/trpc/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from './toaster';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <NextThemesProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </NextThemesProvider>
    </TRPCReactProvider>
  );
}
