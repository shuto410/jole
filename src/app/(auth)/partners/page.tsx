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
import { Badge, badgeVariants } from '@/components/ui/badge';
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
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getMockPartners } from './data';

export default function Page() {
  const partners = getMockPartners();
  return (
    <div className='flex'>
      <ScrollArea className='border-r-2 h-screen w-[450px]'>
        {partners.map((p) => {
          return (
            <div key='key' className='flex items-center p-3 border-b'>
              <Avatar>
                <AvatarImage src={p.imageUrl} />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <span className='w-12 pl-3'>{p.userName}</span>
              <span className='text-sm text-muted-foreground pl-3'>
                {p.lastMessage.substring(0, 25)}...
              </span>
            </div>
          );
        })}
      </ScrollArea>
      <ScrollArea className='border-r-2 h-screen w-full'>
        {partners.map(({ messages }) => {
          return messages.map((message) => {
            const justifyContentClassName = message.isUsers
              ? 'justify-end'
              : 'justify-start';
            return (
              <div
                key={message.message}
                className={`p-3 flex ${justifyContentClassName}`}
              >
                <Badge className='px-4 py-2'>
                  <div className='max-w-xs'>{message.message}</div>
                </Badge>
              </div>
            );
          });
        })}
        <div>messages</div>
      </ScrollArea>
    </div>
  );
}

export type Partner = {
  userName: string;
  imageUrl: string;
  lastMessage: string;
  messages: { isUsers: boolean; message: string }[];
};
