import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PublicUserProfile } from '@/lib/types';
import Link from 'next/link';
import { badgeVariants } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart } from 'lucide-react';

export function UserProfilePopup({
  isOpen,
  setIsOpen,
  profile,
  onRequestButtonClick,
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <div className='flex items-center justify-between'>
              <div>
                <span className='text-sm font-medium '>{name}</span>
                <span className='text-sm font-medium text-muted-foreground pl-2'>
                  {age}
                </span>
              </div>
              <div className='pr-6'>
                <div
                  onClick={onRequestButtonClick}
                  className='rounded-full hover:bg-rose-200 active:bg-rose-500 px-2 pt-[0.5rem] pb-[0.4rem]'
                >
                  <Heart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-2'>{keywordBadges}</div>

        <div className='text-sm font-medium pt-4 leading-5 line-clamp-4'>
          {selfIntroduction}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export type UserProfilePopupProps = {
  isOpen: boolean;
  profile: PublicUserProfile;
  setIsOpen: (open: boolean) => void;
  onRequestButtonClick: () => void;
};
