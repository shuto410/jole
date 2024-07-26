'use client';
import { LogoutButton } from '@/components/buttons/logout-button';
import { SignUpSection } from '@/components/sign-up-section';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebaseConfig';
import Link from 'next/link';

export default function Page() {
  const checkLoginStatus = async () => {
    const user = auth.currentUser;
    console.log(user?.uid);
  };
  return (
    <div className='flex justify-center'>
      <div className='w-[400px]'>
        <SignUpSection />
        <div>
          <Button onClick={() => checkLoginStatus()}>check google login</Button>
        </div>
        <LogoutButton />
        <Link href='/home'>
          <Button>home</Button>
        </Link>
      </div>
    </div>
  );
}
