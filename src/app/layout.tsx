'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { UserAuthContext } from '@/contexts/user-auth-context';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  return (
    <UserAuthContext.Provider value={{ userId, setUserId }}>
      <html lang='en'>
        <body className={inter.className}>
          <div>{children}</div>
          <Toaster />
        </body>
      </html>
    </UserAuthContext.Provider>
  );
}
