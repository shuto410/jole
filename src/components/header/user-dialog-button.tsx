'use client';
import { auth } from '@/lib/firebaseConfig';
import { useContext, useEffect, useState } from 'react';
import { UserProfileForm } from '../user-profile-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SignUpSection } from '../sign-up-section';
import { UserIcon } from '../user-icon';
import { PublicUserProfile } from '@/lib/types';
import { LoginButton } from '../buttons/login-button';
import { fetchPublicUserProfile } from '@/lib/firebaseApi';
import { UserAuthContext } from '@/contexts/user-auth-context';
import { onAuthStateChanged } from '@firebase/auth';

export function UserDialogButton() {
  const { userId, setUserId } = useContext(UserAuthContext);
  const [publicUserProfile, setPublicUserProfile] = useState<
    PublicUserProfile | undefined
  >(undefined);
  const fetchLatestProfile = async () => {
    if (userId) {
      const userProfile = await fetchPublicUserProfile(userId);
      if (userProfile) setPublicUserProfile(userProfile);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Logged in');
        setUserId(user.uid);
        const userProfile = await fetchPublicUserProfile(user.uid);
        if (userProfile) setPublicUserProfile(userProfile);
      } else {
        console.error('User not logged in');
      }
    });
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <UserIcon
          imageUrl='https://github.com/shadcn.png'
          fallbackText='OM'
          onClick={fetchLatestProfile}
        />
      </SheetTrigger>
      <SheetContent>
        {!!userId && !!publicUserProfile ? (
          <>
            <SheetHeader className='pb-4'>
              <SheetTitle>Edit Your Profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>
            <UserProfileForm
              userId={userId}
              submitButtonText='Update'
              defaultValues={publicUserProfile}
            />
          </>
        ) : (
          <>
            <SheetHeader className='pb-4'>
              <SheetTitle>Your Profile</SheetTitle>
            </SheetHeader>
            <LoginButton />
            <SignUpSection />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
