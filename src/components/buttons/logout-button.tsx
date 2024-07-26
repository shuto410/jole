'use client';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthentication } from '@/hooks/useAuthentication';

export function LogoutButton() {
  const { logout } = useAuthentication();
  return (
    <div>
      <Button onClick={() => logout(true)} className='p-2'>
        <LogOut />
      </Button>
    </div>
  );
}
