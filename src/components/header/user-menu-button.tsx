'use client';
import { UserIcon } from '../user-icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCard, LogOut, Settings, User, Users } from 'lucide-react';
import { useAuthentication } from '@/hooks/useAuthentication';
import { UserAuthContext } from '@/contexts/user-auth-context';
import { useContext, useEffect } from 'react';
import { fetchPublicUserProfile } from '@/lib/firebaseApi/firestore';

export function UserMenuButton({
  setIsUserProfilePopupOpen,
}: UserMenuButtonProps) {
  const { isUserLoggedIn, userId, login, logout } = useAuthentication();
  const { userProfile, setUserProfile } = useContext(UserAuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userProfile = await fetchPublicUserProfile(userId);
        if (userProfile) {
          setUserProfile(userProfile);
        } else {
          setUserProfile(undefined);
        }
      }
    };
    fetchData();
  }, [userId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserIcon
          imageUrl={userProfile?.imageUrl ?? 'https://github.com/shadcn.png'}
          fallbackText='OM'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-46 px-3 pb-3 pt-2 mr-3'>
        <DropdownMenuGroup>
          {isUserLoggedIn && userProfile ? (
            <>
              <DropdownMenuLabel>
                <span className='font-thin text-slate-600 text-sm'>
                  {userProfile?.name}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIsUserProfilePopupOpen(true);
                }}
                className='p-2'
              >
                <User className='mr-3 h-4 w-4' />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='p-2'>
                <CreditCard className='mr-3 h-4 w-4' />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='p-2'>
                <Users className='mr-3 h-4 w-4' />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='p-2'>
                <Settings className='mr-3 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout(true)} className='p-2'>
                <LogOut className='mr-3 h-4 w-4' />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => login()}>
                SignIn
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type UserMenuButtonProps = {
  setIsUserProfilePopupOpen: (isOpen: boolean) => void;
};
