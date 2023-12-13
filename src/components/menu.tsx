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
export default function Menu() {
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
      <div className='px-2'>
        <Avatar className='w-8 h-8'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
