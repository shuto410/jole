'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { UserAuthContext } from '@/contexts/user-auth-context';
import { useState } from 'react';
import { UiContext } from '@/contexts/ui-context';
import { SignUpPopup } from '@/components/sign-up-section/sign-up-dialog';
import { PublicUserProfile } from '@/lib/types';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<PublicUserProfile | undefined>(
    undefined,
  );
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  return (
    <UserAuthContext.Provider
      value={{ userId, setUserId, userProfile, setUserProfile }}
    >
      <UiContext.Provider value={{ isSignUpPopupOpen, setIsSignUpPopupOpen }}>
        <html lang='en'>
          <body className={inter.className}>
            <div>{children}</div>
            <Toaster />
            <SignUpPopup userId={userId} />
          </body>
        </html>
      </UiContext.Provider>
    </UserAuthContext.Provider>
  );
}
