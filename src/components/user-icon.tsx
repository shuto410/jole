import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserIcon({ imageUrl, fallbackText, onClick }: UserIconProps) {
  return (
    <Avatar className='w-9 h-9' onClick={onClick}>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
}

export type UserIconProps = {
  imageUrl: string;
  fallbackText: string;
  onClick?: () => void;
};
