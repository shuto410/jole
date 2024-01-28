'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { badgeVariants } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebaseConfig';
import { PublicUserProfile } from '@/lib/types';
import { UserIcon } from '@/components/user-icon';
import { UserCard } from '@/components/user-card';

export default function Page() {
  const [users, setUsers] = useState<PublicUserProfile[]>([]);
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      const docs: PublicUserProfile[] = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data() as PublicUserProfile);
      });
      setUsers(docs);
    }
    fetchData();
  }, []);

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
          <div className='grid grid-cols-2 items-start gap-4 pt-4 '>
            {users.map((user) => (
              <div
                key={user.name}
                className='w-[275px] min-h-[100px] max-h-[200px]'
              >
                <UserCard {...user} headerButtonLabel='Request' />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
