import { SignUpSection } from '@/components/sign-up-section';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserCard } from '@/components/user-card';
import { mockUserProfiles } from '@/mock-data/public-user-profiles';

export default function Page() {
  return (
    <ScrollArea className='h-screen'>
      <div className='flex justify-center space-x-4'>
        <div className='w-[250px]'></div>
        <div className='w-[400px] mt-4 space-y-4'>
          {mockUserProfiles.map((user) => (
            <UserCard key={user.name} {...user} />
          ))}
        </div>
        <div className='w-[250px] mt-4 flex-initial'>
          <SignUpSection />
        </div>
      </div>
    </ScrollArea>
  );
}
