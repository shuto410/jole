'use client';
import { useAuthentication } from '@/hooks/useAuthentication';
import { Button } from '../ui/button';
import { Search } from '@trejgun/material-ui-icons-google';

export function LoginButton() {
  const { login } = useAuthentication();
  return (
    <Button variant='outline' onClick={() => login()} className='p-2 w-full'>
      <Search />
      <p className='p-2'>Sign up with Google</p>
    </Button>
  );
}

export type LoginButtonProps = {
  onSignUpReguired: (userId: string) => void;
};
