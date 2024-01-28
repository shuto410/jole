import { UserIcon } from '@/components/user-icon';
import { Partner } from '@/lib/types';

export function PartnerList({ partners, onClickPartner }: PartnerListProps) {
  return partners.map(({ imageUrl, userName, lastMessage }, index) => {
    return (
      <div
        key='key'
        className='flex items-center p-3 border-b'
        onClick={() => onClickPartner(index)}
      >
        <UserIcon imageUrl={imageUrl} fallbackText={userName.slice(0, 2)} />
        <span className='w-12 pl-3'>{userName}</span>
        <span className='text-sm text-muted-foreground pl-3'>
          {lastMessage.substring(0, 25)}...
        </span>
      </div>
    );
  });
}

export type PartnerListProps = {
  partners: Partner[];
  onClickPartner: (index: number) => void;
};
