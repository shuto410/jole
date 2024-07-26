import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

export function Chat({ userId, messages }: ChatProps) {
  return messages.map(({ uid, text, sentAt }) => {
    const isUser = uid === userId;
    const sentAtDate = new Date(sentAt);
    const justifyContentClassName = isUser ? 'justify-end' : 'justify-start';

    return (
      <div key={text} className={cn('p-3 flex', justifyContentClassName)}>
        <div>
          <div className='pl-4 text-[10px] '>
            {sentAtDate.getUTCHours()}:{sentAtDate.getUTCMinutes()}
          </div>
          <div className='text-xs bg-white text-secondary-foreground hover:bg-primary/10 border-[1.5px] rounded-lg px-[10px] pb-[4px] pt-[5px]  font-semibold transition-colors focus:outline-none'>
            {text}
          </div>
        </div>
      </div>
    );
  });
}

export type ChatProps = {
  userId: string;
  messages: Message[];
};
