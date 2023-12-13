'use client';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { UserDialogButton } from './userDialogButton';
import { collection, addDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { firestore } from '@/lib/firebaseConfig';
import { User } from '@/app/search/page';
import { mockUsers } from '@/app/search/data';
export function Menu() {
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       mockUsers.forEach(async (user) => {
  //         const docRef = await addDoc(collection(firestore, 'users'), user);
  //         console.log('Document written with ID: ', docRef.id);
  //       });
  //     } catch (e) {
  //       console.error('Error adding document: ', e);
  //     }
  //   }
  //   fetchData();
  // }, []);
  return (
    <nav className='flex py-2 pl-4 justify-between items-center border-b border-slate-300 bg-white	'>
      <div>
        <Link href='/'>
          <span className='text-base pr-4 '>Home</span>
        </Link>
        <Link href='/search'>
          <span className='text-base pr-4'>Search</span>
        </Link>
        <Link href='/partners'>
          <span className='text-base pr-4'>Partners</span>
        </Link>
      </div>
      <div className='flex px-2'>
        <UserDialogButton />
      </div>
    </nav>
  );
}
