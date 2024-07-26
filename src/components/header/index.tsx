'use client';
import Link from 'next/link';
import { useState } from 'react';
import { UserMenuButton } from './user-menu-button';
import { UserProfileUpdatePopup } from './user-profile-edit-popup';
import { useAuthentication } from '@/hooks/useAuthentication';
import { Button } from '../ui/button';
import { fetchPendingRequestingUsers } from '@/lib/firebaseApi/firestore';

export function Header() {
  const { userId } = useAuthentication();
  const [isUserProfilePopupOpen, setIsUserProfilePopupOpen] = useState(false);
  return (
    <>
      <nav className='flex py-1 pl-4 justify-between items-center border-b border-slate-300'>
        <div>
          <Link href='/home'>
            <span className='text-base py-2 px-2 hover:text-sky-500 active:text-sky-700'>
              Home
            </span>
          </Link>
          <Link href='/search'>
            <span className='text-base py-2 px-2 hover:text-sky-500 active:text-sky-700'>
              Search
            </span>
          </Link>
          {userId && (
            <>
              <Link href='/partners'>
                <span className='text-base py-2 px-2  hover:text-sky-500 active:text-sky-700'>
                  Partners
                </span>
              </Link>
              <Link href='/requests'>
                <span className='text-base py-2 px-2 hover:text-sky-500 active:text-sky-700'>
                  Requests
                </span>
              </Link>
              {userId}
              <Button
                onClick={async () => {
                  const res = await fetchPendingRequestingUsers(userId);
                  console.log(res);
                }}
              />
            </>
          )}
        </div>
        <div className='flex px-2 mr-2'>
          <UserMenuButton
            setIsUserProfilePopupOpen={setIsUserProfilePopupOpen}
          />
          <UserProfileUpdatePopup
            isOpen={isUserProfilePopupOpen}
            setIsOpen={setIsUserProfilePopupOpen}
          />
        </div>
      </nav>
    </>
  );
}
