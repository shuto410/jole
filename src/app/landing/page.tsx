'use client';
import { LoginButton } from '@/components/login-button';
import { SignOutButton } from '@/components/sign-out-button';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebaseConfig';
import Link from 'next/link';

export default function Page() {
  const checkLoginStatus = async () => {
    const user = auth.currentUser;
    console.log(user?.uid);
  };
  return (
    <>
      landing
      <LoginButton />
      <div>
        <Button onClick={() => checkLoginStatus()}>check google login</Button>
      </div>
      <SignOutButton />
      <Link href='/home'>
        <Button>home</Button>
      </Link>
      <Link href='/signup'>
        <Button>Sign up</Button>
      </Link>
    </>
  );
}
