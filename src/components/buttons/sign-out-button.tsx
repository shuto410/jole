'use client';
import { LogOut } from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { Button } from '../ui/button';
import { auth, provider } from '@/lib/firebaseConfig';

export function SignOutButton() {
  const googleSignOut = async () => {
    signOut(auth)
      .then(() => {
        console.log('sign-out successful');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Button onClick={() => googleSignOut()} className='p-2'>
        <LogOut />
      </Button>
    </div>
  );
}
