'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PartnerList } from './partner-list';
import { Chat } from './chat';
import { useEffect, useState } from 'react';
import {
  fetchAllChats,
  fetchPartnerProfiles,
  sendChatMessage,
} from '@/lib/firebaseApi/firestore';
import { Chats } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Send, ImagePlus } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { chatsCollectionRef } from '@/lib/firebaseConfig';
import { useAuthentication } from '@/hooks/useAuthentication';

export default function Page() {
  const { userId } = useAuthentication();
  const [partnerProfiles, setPartnerProfiles] = useState<PartnerProfile[]>([]);
  const [chats, setChats] = useState<Chats>({});
  const [selectedPartnerId, setSelectedPartnerId] = useState<
    string | undefined
  >(undefined);
  const [message, setMessage] = useState<string>('');

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
    }
  }

  const handleClickSendButton = async () => {
    if (userId && selectedPartnerId) {
      await sendChatMessage(userId, selectedPartnerId, message);
      await fetchData();
      // COMMENT: display message on local immediately
      setMessage('');
    }
  };

  useEffect(() => {
    fetchData();
    if (userId) {
      const unsub = onSnapshot(doc(chatsCollectionRef, userId), (doc) => {
        setChats(doc.data() || {});
      });
    }
  }, [userId]);

  useEffect(() => {
    if (selectedPartnerId === undefined) {
      setSelectedPartnerId(partnerProfiles?.[0]?.id);
    }
  }, [partnerProfiles, selectedPartnerId]);

  return (
    <div className='flex'>
      <ScrollArea className='border-r-2 h-screen max-w-[450px]'>
        <PartnerList
          partners={partnerProfiles}
          onClickPartner={setSelectedPartnerId}
        />
      </ScrollArea>
      <div className='grow'>
        <ScrollArea className='h-screen'>
          {/* // COMMENT: impl lazy loading for user id */}
          {selectedPartnerId && userId && (
            <Chat
              userId={userId}
              messages={chats[selectedPartnerId]?.messages || []}
            />
          )}
          {/* for scroll margin */}
          <div className='h-[200px]'></div>
        </ScrollArea>
        <div className='sticky bottom-0 p-3 '>
          <Textarea
            placeholder='Type a message'
            className='w-full'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.ctrlKey && e.key === 'Enter') {
                handleClickSendButton();
              }
            }}
          />
          <div className='flex justify-between'>
            <div className='hover:bg-slate-200 p-1 mt-2 mx-1 rounded-md active:bg-sky-300'>
              <ImagePlus />
            </div>
            <div
              onClick={handleClickSendButton}
              className='hover:bg-slate-200 p-1  mt-2 mx-1 rounded-md active:bg-sky-300'
            >
              <Send />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type PartnerProfile = {
  id: string;
  userName: string;
  imageUrl?: string;
  lastMessage: string;
};
