'use client';
import { LogIn } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { Button } from './ui/button';
import { auth, provider } from '@/lib/firebaseConfig';

export function LoginButton() {
  const login = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user.uid);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Button onClick={() => login()} className='p-2'>
        <LogIn />
      </Button>
    </div>
  );
}
