import { signInWithPopup, signOut } from 'firebase/auth';
import { fetchPublicUserProfile } from '../firestore';
import { auth, provider } from '@/lib/firebaseConfig';

export const login = async (
  onLogin?: (userId: string) => void,
  onSignUp?: (userId: string) => void,
) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const userId = result.user.uid;
      console.log('🚀 ~ .then ~ userId:', userId);
      const userProfile = await fetchPublicUserProfile(userId);
      if (userProfile) {
        onLogin?.(userId);
      } else {
        onSignUp?.(userId);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const logout = async (onSuccess: () => void, onFailure: () => void) => {
  signOut(auth)
    .then(() => {
      onSuccess();
      console.log('sign-out successful');
    })
    .catch((error) => {
      onFailure();
      console.error(error);
    });
};
