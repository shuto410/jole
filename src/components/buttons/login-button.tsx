'use client';
import { signInWithPopup } from 'firebase/auth';
import { Button } from '../ui/button';
import { auth, provider } from '@/lib/firebaseConfig';
import { Search } from '@trejgun/material-ui-icons-google';
import { fetchPublicUserProfile } from '@/lib/firebaseApi';

export function LoginButton({ onLogin, onSignUp }: LoginButtonProps) {
  const login = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const userId = result.user.uid;
        console.log('🚀 ~ .then ~ userId:', userId);
        const userProfile = await fetchPublicUserProfile(userId);
        if (userProfile) {
          onLogin?.(userId);
        } else {
          onSignUp?.(userId);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Button variant='outline' onClick={() => login()} className='p-2 w-full'>
      <Search />
      <p className='p-2'>Sign up with Google</p>
    </Button>
  );
}

export type LoginButtonProps = {
  onLogin?: (userId: string) => void;
  onSignUp?: (userId: string) => void;
};
