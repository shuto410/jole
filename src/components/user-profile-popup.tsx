import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PublicUserProfile } from '@/lib/types';
import Link from 'next/link';
import { badgeVariants } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

export function UserProfilePopup({
  isOpen,
  profile,
  onClickClose,
}: UserProfilePopupProps) {
  if (!profile) return null;
  const { name, age, keywords, selfIntroduction, imageUrl } = profile;
  const keywordBadges = keywords?.map(({ label }) => (
    <span key={label} className='pr-1'>
      <Link
        href={`/keyword/${label}`}
        className={badgeVariants({ variant: 'default' })}
      >
        {label}
      </Link>
    </span>
  ));
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className='flex items-center space-x-4'>
          <Avatar>
            <AvatarImage
              src={imageUrl ?? `https://picsum.photos/seed/${name}/200/200`}
            />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className='flex-grow'>
            <span className='text-sm font-medium '>{name}</span>
            <span className='text-sm font-medium text-muted-foreground pl-2'>
              {age}
            </span>
          </div>
        </div>
        <div className='pt-2'>{keywordBadges}</div>

        <div className='text-sm font-medium pt-4 leading-5 line-clamp-4'>
          {selfIntroduction}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='secondary' onClick={onClickClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export type UserProfilePopupProps = {
  isOpen: boolean;
  profile: PublicUserProfile;
  onClickClose: () => void;
};
