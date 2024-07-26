import { Button } from '@/components/ui/button';
import { Inbox } from 'lucide-react';

export function NoRequests() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center space-y-4'>
        <div>
          <Inbox size='58px' color='#475569' />
        </div>
        <div className='text-3xl font-semibold text-slate-600'>
          No request sent
        </div>
        <div className='w-[150px] text-center pt-4'>
          <Button>Search Partners</Button>
        </div>
      </div>
    </div>
  );
}
