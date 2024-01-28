import { ScrollArea } from '@/components/ui/scroll-area';
import { UserCard } from '@/components/user-card';
import { fetchRequestingUserRelationship } from '@/lib/firebaseApi';
import { PublicUserProfile } from '@/lib/types';
import { mockUserProfiles } from '@/mock-data/public-user-profiles';
import { useEffect, useState } from 'react';

export default function Page() {
  const [requestingUserProfiles, setRequestingUserProfiles] = useState<
    PublicUserProfile[]
  >([]);

  return (
    <div className='flex justify-center'>
      <ScrollArea className='h-screen w-[450px]'>
        <div className='mt-4 space-y-4'>
          {mockUserProfiles.map((user) => {
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
