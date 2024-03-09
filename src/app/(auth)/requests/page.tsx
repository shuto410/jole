'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserCard } from '@/components/user-card';
import { UserAuthContext } from '@/contexts/user-auth-context';
import { fetchRequestingUsers } from '@/lib/firebaseApi';
import { PublicUserProfile } from '@/lib/types';
import { mockUserProfiles } from '@/mock-data/public-user-profiles';
import { useContext, useEffect, useState } from 'react';

export default function Page() {
  const { userId } = useContext(UserAuthContext);
  const [requestingUserProfiles, setRequestingUserProfiles] = useState<
    PublicUserProfile[]
  >([]);

  useEffect(() => {
    if (userId) {
      fetchRequestingUsers(userId).then((userProfiles) => {
        setRequestingUserProfiles(userProfiles);
      });
    }
  }, [userId]);

  return (
    <div className='flex justify-center'>
      <ScrollArea className='h-screen w-[450px]'>
        <div className='mt-4 space-y-4'>
          {requestingUserProfiles.map((user) => {
            return (
              <div key={user.name}>
                <UserCard {...user} headerButtonLabel='Approved' />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
