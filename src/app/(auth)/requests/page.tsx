'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserCard } from '@/components/user-card';
import { UserAuthContext } from '@/contexts/user-auth-context';
import {
  fetchPendingRequestingUsers,
  sendApproveRequest,
} from '@/lib/firebaseApi';
import { PublicUserProfileWithId } from '@/lib/types';
import { useContext, useEffect, useState } from 'react';

export default function Page() {
  const { userId } = useContext(UserAuthContext);
  const [requestingUserProfiles, setRequestingUserProfiles] = useState<
    PublicUserProfileWithId[]
  >([]);

  useEffect(() => {
    if (userId) {
      fetchPendingRequestingUsers(userId).then((userProfiles) => {
        setRequestingUserProfiles(userProfiles);
      });
    }
  }, [userId]);

  const handleApproveRequest = (targetUserId: string) => () => {
    if (userId) {
      sendApproveRequest(userId, targetUserId).then(() => {
        // Refresh the list of requesting users here
        // to reflect the changes immediately in the UI
        fetchPendingRequestingUsers(userId).then((userProfiles) => {
          setRequestingUserProfiles(userProfiles);
        });
      });
    }
  };

  return (
    <div className='flex justify-center'>
      <ScrollArea className='h-screen w-[450px]'>
        <div className='mt-4 space-y-4'>
          {requestingUserProfiles.map((user) => {
            return (
              <div key={user.name}>
                <UserCard
                  {...user}
                  headerButtonLabel='Approve'
                  onHeaderButtonClick={handleApproveRequest(user.id)}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
