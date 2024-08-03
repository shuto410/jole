import { PublicUserProfile } from '@/lib/types';
import Link from 'next/link';
import { badgeVariants } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function UserCard(props: UserCardProps) {
  const {
    name,
    age,
    keywords,
    selfIntroduction,
    imageUrl,
    headerButtonLabel,
    headerIcon,
    onHeaderButtonClick,
    onClick,
    onSeeMoreButtonClick,
  } = props;

  const keywordBadges = keywords?.map(({ label }) => {
    return (
      <span key={name + label} className='pr-1'>
        <Link
          href={`/keyword/${label}`}
          className={badgeVariants({ variant: 'default' })}
        >
          {label}
        </Link>
      </span>
    );
  });

  return (
    <Card
      key={name + String(age)}
      className={cn(
        'block',
        onClick && 'hover:bg-slate-100 active:bg-slate-200',
      )}
      onClick={onClick}
    >
      <CardContent className='pt-4'>
        <div className='flex items-center space-x-2'>
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
          <div className='flex-shrink-0'>
            {headerButtonLabel && (
              <Button variant='outline' onClick={onHeaderButtonClick}>
                {headerButtonLabel}
              </Button>
            )}
            {headerIcon && (
              <div
                onClick={onHeaderButtonClick}
                className='rounded-full hover:bg-rose-200 px-2 pt-[0.6rem] pb-[0.4rem]'
              >
                {headerIcon}
              </div>
            )}
          </div>
        </div>
        <div className='pt-2'>{keywordBadges}</div>

        <div className='text-sm pt-4 leading-5 line-clamp-4'>
          {selfIntroduction}
        </div>
      </CardContent>
    </Card>
  );
}

export type UserCardProps = PublicUserProfile & {
  headerButtonLabel?: string;
  headerIcon?: React.ReactNode;
  onHeaderButtonClick?: () => void;
  onClick?: () => void;
  onSeeMoreButtonClick?: () => void;
};
