import { UserIcon } from '@/components/user-icon';
import { PartnerProfile } from './page';

export function PartnerList({ partners, onClickPartner }: PartnerListProps) {
  return partners.map(({ id, imageUrl, userName, lastMessage }) => {
    return (
      <div
        key={id}
        className='flex items-center p-3 border-b hover:bg-gray-100'
        onClick={() => onClickPartner(id)}
      >
        <UserIcon
          imageUrl={imageUrl ?? ''}
          fallbackText={userName.slice(0, 2)}
        />
        <span className='pl-3'>{userName}</span>
        <span className='text-sm text-muted-foreground pl-3'>
          {lastMessage.substring(0, 25)}...
        </span>
      </div>
    );
  });
}

export type PartnerListProps = {
  partners: PartnerProfile[];
  onClickPartner: (id: string) => void;
};
