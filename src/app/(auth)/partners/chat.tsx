import { Badge, BadgeProps } from '@/components/ui/badge';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

export function Chat({ userId, messages }: ChatProps) {
  return messages.map(({ uid, text, sentAt }) => {
    const isUser = uid === userId;
    const sentAtDate = new Date(sentAt);
    const justifyContentClassName = isUser ? 'justify-end' : 'justify-start';

    const badgeVariant = (
      isUser ? 'default' : 'white'
    ) satisfies BadgeProps['variant'];

    return (
      <div key={text} className={cn('p-3 flex', justifyContentClassName)}>
        <div>
          <div className='pl-4 text-[10px] '>
            {sentAtDate.getUTCHours()}:{sentAtDate.getUTCMinutes()}
          </div>
          <Badge className='px-5 py-3' variant={badgeVariant}>
            <div className='max-w-xs'>{text}</div>
          </Badge>
          <div className='text-sm bg-white text-secondary-foreground hover:bg-primary/80 border-[1.5px] rounded-lg px-3 py-1 font-semibold transition-colors focus:outline-none'>
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
