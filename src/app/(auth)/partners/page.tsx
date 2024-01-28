'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getMockPartners } from '../../../mock-data/partners';
import { PartnerList } from './partner-list';
import { Chat } from './chat';
import { useState } from 'react';

export default function Page() {
  const partners = getMockPartners();
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState(0);

  return (
    <div className='flex'>
      <ScrollArea className='border-r-2 h-screen w-[450px]'>
        <PartnerList
          partners={partners}
          onClickPartner={setSelectedPartnerIndex}
        />
      </ScrollArea>
      <ScrollArea className='border-r-2 h-screen w-full'>
        <Chat messages={partners[selectedPartnerIndex].messages} />
      </ScrollArea>
    </div>
  );
}
