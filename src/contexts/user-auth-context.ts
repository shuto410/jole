import { createContext } from 'react';

type UserAuthContextValue = {
  userId: string | null;
  setUserId: (userId: string) => void;
};
export const UserAuthContext = createContext<UserAuthContextValue>({
  userId: null,
  setUserId: () => undefined,
});
