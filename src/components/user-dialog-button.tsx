import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfileForm } from './user-profile-form';

export function UserDialogButton() {
  const button = (
    <Avatar className='w-9 h-9'>
      <AvatarImage src='https://github.com/shadcn.png' />
      <AvatarFallback>OM</AvatarFallback>
    </Avatar>
  );

  const header = (
    <>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you are done.
      </SheetDescription>
    </>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{button}</SheetTrigger>
      <SheetContent>
        <SheetHeader className='pb-4'> {header}</SheetHeader>
        <UserProfileForm />
      </SheetContent>
    </Sheet>
  );
}
