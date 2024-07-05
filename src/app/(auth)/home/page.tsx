'use client';
import { SignUpSection } from '@/components/sign-up-section';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserCard } from '@/components/user-card';
import { useAllUsers } from '@/hooks/useAllUsers';

export default function Page() {
  const { allUsers } = useAllUsers();
  return (
    <ScrollArea className='h-screen'>
      <div className='flex justify-center space-x-4'>
        <div className='w-[250px]'></div>
        <div className='w-[400px] mt-4 space-y-4'>
          {allUsers.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>
        <div className='w-[250px] mt-4 flex-initial'>
          <SignUpSection />
        </div>
      </div>
    </ScrollArea>
  );
}
