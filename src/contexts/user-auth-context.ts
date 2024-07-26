import { PublicUserProfile } from '@/lib/types';
import { createContext } from 'react';

type UserAuthContextValue = {
  userId: string | null;
  userProfile: PublicUserProfile | undefined;
  setUserId: (userId: string | null) => void;
  setUserProfile: (userProfile: PublicUserProfile | undefined) => void;
};

export const UserAuthContext = createContext<UserAuthContextValue>({
  userId: null,
  setUserId: () => undefined,
  userProfile: undefined,
  setUserProfile: () => undefined,
});
