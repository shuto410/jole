'use client';
import { auth, usersCollectionRef } from '@/lib/firebaseConfig';
import { useState } from 'react';
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
import { doc, getDoc } from 'firebase/firestore';
import { PublicUserProfile } from '@/lib/types';
import { LoginButton } from '../buttons/login-button';
import { fetchPublicUserProfile } from '@/lib/firebaseApi';
import { set } from 'zod';

export function UserDialogButton() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [publicUserProfile, setPublicUserProfile] = useState<
    PublicUserProfile | undefined
  >(undefined);
  const checkLoginStatus = async () => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      const userProfile = await fetchPublicUserProfile(user.uid);
      if (userProfile) setPublicUserProfile(userProfile);
      console.log('Logged in');
      console.log('uid: ', user.uid);
    } else {
      console.error('User not logged in');
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) setPublicUserProfile(undefined);
  };

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger>
        <UserIcon
          imageUrl='https://github.com/shadcn.png'
          fallbackText='OM'
          onClick={checkLoginStatus}
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
