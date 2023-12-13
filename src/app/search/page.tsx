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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { badgeVariants } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockUsers } from './data';
import { Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  const users = mockUsers;
  const userCards = users.map((user) => {
    const keywordBadges = user.keywords.map((keyword) => (
      <span key={keyword.label} className='pr-1'>
        <Link
          href={user.imageUrl}
          className={badgeVariants({ variant: 'default' })}
        >
          {keyword.label}
        </Link>
      </span>
    ));
    return (
      <Card key={user.name + String(user.age)}>
        <CardContent className='pt-4'>
          <div className='flex items-center space-x-4'>
            <Avatar>
              <AvatarImage
                src={`https://picsum.photos/seed/${user.name}/200/200`}
              />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <span className='text-sm font-medium '>{user.name}</span>
              <span className='text-sm font-medium text-muted-foreground pl-2'>
                ({user.age})
              </span>
            </div>
          </div>
          <div className='pt-2'>{keywordBadges}</div>

          <div className='text-sm font-medium pt-4 leading-5	'>
            {user.selfIntroduction}
          </div>
        </CardContent>
      </Card>
    );
  });

  return (
    <div className='flex justify-center'>
      <div className='w-[600px]'>
        <div className='pt-4 flex gap-2 pb-4'>
          <Input type='search' placeholder='Search...' />
          <Button type='submit' className='p-3 bg-slate-500'>
            <Search />
          </Button>
        </div>
        <Separator />
        <ScrollArea className='h-screen w-[600px]'>
          <div className='grid grid-cols-2 gap-4 place-items-center pt-4'>
            {userCards}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
export type User = {
  name: string;
  imageUrl: string;
  age: number;
  keywords: {
    label: string;
    link: string;
  }[];
  selfIntroduction: string;
};
