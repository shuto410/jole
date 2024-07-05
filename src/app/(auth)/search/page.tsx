'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Heart, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useContext, useState } from 'react';
import { UserCard } from '@/components/user-card';
import { sendPartnerRequest } from '@/lib/firebaseApi';
import { UserAuthContext } from '@/contexts/user-auth-context';
import { useAllUsers } from '@/hooks/useAllUsers';
import { UserProfilePopup } from '@/components/user-profile-popup';
import { PublicUserProfile } from '@/lib/types';

export default function Page() {
  const { userId } = useContext(UserAuthContext);
  const { allUsers } = useAllUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState<
    PublicUserProfile | undefined
  >(undefined);

  const handleHeaderButtonClick = (targetUserId: string) => () => {
    if (userId) {
      sendPartnerRequest(userId, targetUserId);
    }
  };

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
            {allUsers.map((user) => (
              <div
                key={user.name}
                className='w-[275px] min-h-[100px] max-h-[300px]'
              >
                <UserCard
                  {...user}
                  headerIcon={<Heart />}
                  onHeaderButtonClick={handleHeaderButtonClick(user.id)}
                  onClick={() => {
                    setSelectedUserProfile(user);
                    setIsOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
        {selectedUserProfile && (
          <UserProfilePopup
            isOpen={isOpen}
            profile={selectedUserProfile}
            onClickClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
