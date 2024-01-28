import { Badge, BadgeProps } from '@/components/ui/badge';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

export function Chat({ messages }: ChatProps) {
  return messages.map(({ isUser, text, arrivedAt }) => {
    const justifyContentClassName = isUser ? 'justify-end' : 'justify-start';

    const badgeVariant = (
      isUser ? 'secondary' : 'default'
    ) satisfies BadgeProps['variant'];

    return (
      <div key={text} className={cn('p-3 flex', justifyContentClassName)}>
        <div>
          <div className='pl-4 text-[10px] '>{arrivedAt}</div>
          <Badge className='px-4 py-2' variant={badgeVariant}>
            <div className='max-w-xs'>{text}</div>
          </Badge>
        </div>
      </div>
    );
  });
}

export type ChatProps = {
  messages: Message[];
};
