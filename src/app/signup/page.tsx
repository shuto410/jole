'use client';
import { LoginButton } from '@/components/login-button';
import { SignOutButton } from '@/components/sign-out-button';
import { Button } from '@/components/ui/button';
import { UserProfileForm } from '@/components/user-profile-form';
import { auth } from '@/lib/firebaseConfig';
import Link from 'next/link';

export default function Page() {
  const checkLoginStatus = async () => {
    const user = auth.currentUser;
    console.log(user?.uid);
  };
  return (
    <>
      <UserProfileForm></UserProfileForm>
    </>
  );
}
