'use client';
import Link from 'next/link';
import { UserDialogButton } from './user-dialog-button';
import { UserAuthContext } from '@/contexts/user-auth-context';
import { useContext } from 'react';

export function Header() {
  const { userId } = useContext(UserAuthContext);
  return (
    <>
      <nav className='flex py-1 pl-4 justify-between items-center border-b border-slate-300'>
        <div>
          <Link href='/home'>
            <span className='text-base py-1 px-2 hover:text-sky-500 active:text-sky-700'>
              Home
            </span>
          </Link>
          <Link href='/search'>
            <span className='text-base py-1 px-2 hover:text-sky-500 active:text-sky-700'>
              Search
            </span>
          </Link>
          {userId && (
            <>
              <Link href='/partners'>
                <span className='text-base py-1 px-2  hover:text-sky-500 active:text-sky-700'>
                  Partners
                </span>
              </Link>
              <Link href='/requests'>
                <span className='text-base py-1 px-2 hover:text-sky-500 active:text-sky-700'>
                  Requests
                </span>
              </Link>
            </>
          )}
        </div>
        <div className='flex px-2'>
          <UserDialogButton />
        </div>
      </nav>
    </>
  );
}
