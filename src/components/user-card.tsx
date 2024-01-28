import { PublicUserProfile } from '@/lib/types';
import Link from 'next/link';
import { badgeVariants } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

export function UserCard(props: UserCardProps) {
  const {
    name,
    age,
    keywords,
    selfIntroduction,
    imageUrl,
    headerButtonLabel,
    onHeaderButtonClick,
  } = props;

  const keywordBadges = keywords?.map((keyword) => (
    <span key={keyword.label} className='pr-1'>
      <Link
        href={imageUrl ?? 'https://picsum.photos/seed/test/200/200'}
        className={badgeVariants({ variant: 'default' })}
      >
        {keyword.label}
      </Link>
    </span>
  ));

  return (
    <Card key={name + String(age)}>
      <CardContent className='pt-4'>
        <div className='flex items-center space-x-4'>
          <Avatar>
            <AvatarImage src={`https://picsum.photos/seed/${name}/200/200`} />
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
          </div>
        </div>
        <div className='pt-2'>{keywordBadges}</div>

        <div className='text-sm font-medium pt-4 leading-5	'>
          {selfIntroduction}
        </div>
      </CardContent>
    </Card>
  );
}

export type UserCardProps = PublicUserProfile & {
  headerButtonLabel?: string;
  onHeaderButtonClick?: () => void;
};
