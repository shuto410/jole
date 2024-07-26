import { toast } from '@/components/ui/use-toast';
import { UiContext } from '@/contexts/ui-context';
import { UserAuthContext } from '@/contexts/user-auth-context';
import { login, logout } from '@/lib/firebaseApi/authentication';
import { fetchPublicUserProfile } from '@/lib/firebaseApi/firestore';
import { auth } from '@/lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export const useAuthentication = (onLogin?: (userId: string) => void) => {
  const { userId, setUserId } = useContext(UserAuthContext);
  const { userProfile, setUserProfile } = useContext(UserAuthContext);
  const { setIsSignUpPopupOpen } = useContext(UiContext);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Logged in');
        setUserId(user.uid);
        onLogin?.(user.uid);
      } else {
        console.error('User not logged in');
        setUserId(null);
      }
    });
  }, []);

  const handleOnLogin = async (userId: string) => {
    setUserId(userId);
    const userProfile = await fetchPublicUserProfile(userId);
    if (userProfile) {
      setUserProfile(userProfile);
    } else {
      setUserProfile(undefined);
    }
    toast({
      title: 'Successfully logged in!',
    });
  };
  const handleOnSignUp = (userId: string) => {
    setIsSignUpPopupOpen(true);
    setUserId(userId);
  };

  const handleLogout = (showMessage?: boolean) => {
    logout(
      () => {
        showMessage &&
          toast({
            title: 'Successfully logged out!',
          });
        setUserProfile(undefined);
        router.refresh();
      },
      () => {
        showMessage &&
          toast({
            title: 'Failed to log out!',
          });
      },
    );
  };

  return {
    userId,
    login: () => login(handleOnLogin, handleOnSignUp),
    logout: handleLogout,
    isUserLoggedIn: !!userId,
  };
};
