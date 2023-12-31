import Link from 'next/link';
import { UserDialogButton } from './user-dialog-button';
export function Menu() {
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
