'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Heart, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { UserCard } from '@/components/user-card';
import { sendPartnerRequest } from '@/lib/firebaseApi/firestore';
import { useAllUsers } from '@/hooks/useAllUsers';
import { UserProfilePopup } from '@/components/user-profile-popup';
import { PublicUserProfile } from '@/lib/types';
import { useAuthentication } from '@/hooks/useAuthentication';

export default function Page() {
  const { userId } = useAuthentication();
  const { allUsers } = useAllUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState<
    PublicUserProfile | undefined
  >(undefined);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(allUsers);

  useEffect(() => {
    setFilteredUsers(allUsers);
  }, [allUsers]);

  const handleHeaderButtonClick = (targetUserId: string) => () => {
    if (userId) {
      console.log('send partner request:', userId, targetUserId);
      sendPartnerRequest(userId, targetUserId);
    }
  };

  const handleSearchClick = () => {
    setFilteredUsers(
      allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchKeyword.toLowerCase()),
      ),
    );
  };

  return (
    <div className='flex justify-center'>
      <div className='w-[600px]'>
        <div className='pt-4 flex gap-2 pb-4'>
          <Input
            type='search'
            placeholder='Search...'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button
            type='submit'
            className='p-3 bg-slate-500'
            onClick={handleSearchClick}
          >
            <Search />
          </Button>
        </div>
        <Separator />
        <ScrollArea className='h-screen w-[600px]'>
          <div className='grid grid-cols-2 items-start gap-4 pt-4 '>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className='w-[275px] min-h-[100px] max-h-[300px]'
              >
                <UserCard
                  {...user}
                  headerIcon={<Heart />}
                  onHeaderButtonClick={handleHeaderButtonClick(user.id)}
                  onSeeMoreButtonClick={() => {
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
            setIsOpen={setIsOpen}
            profile={selectedUserProfile}
            onClickClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
