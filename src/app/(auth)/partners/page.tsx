'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PartnerList } from './partner-list';
import { Chat } from './chat';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from '@/contexts/user-auth-context';
import { fetchAllChats, fetchPartnerProfiles } from '@/lib/firebaseApi';
import { Chats } from '@/lib/types';

export default function Page() {
  const { userId } = useContext(UserAuthContext);
  const [partnerProfiles, setPartnerProfiles] = useState<PartnerProfile[]>([]);
  const [chats, setChats] = useState<Chats>({});
  const [selectedPartnerId, setSelectedPartnerId] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        const partnerUserProfiles = await fetchPartnerProfiles(userId);
        const partnerProfiles = partnerUserProfiles.map((profile) => {
          return {
            id: profile.id,
            userName: profile.name,
            imageUrl: profile.imageUrl,
            lastMessage: 'temp',
          } satisfies PartnerProfile;
        });
        const chats = await fetchAllChats(userId);
        setChats(chats);
        setPartnerProfiles(partnerProfiles);
        setSelectedPartnerId(partnerProfiles[0]?.id);
      }
    }
    fetchData();
  });

  return (
    <div className='flex'>
      <ScrollArea className='border-r-2 h-screen w-[450px]'>
        <PartnerList
          partners={partnerProfiles}
          onClickPartner={setSelectedPartnerId}
        />
      </ScrollArea>
      <ScrollArea className='border-r-2 h-screen w-full'>
        {/* // COMMENT: impl lazy loading for user id */}
        {selectedPartnerId && userId && (
          <Chat
            userId={userId}
            messages={chats[selectedPartnerId]?.messages || []}
          />
        )}
      </ScrollArea>
    </div>
  );
}

export type PartnerProfile = {
  id: string;
  userName: string;
  imageUrl?: string;
  lastMessage: string;
};
