import { firestore } from '@/lib/firebaseConfig';
import { PublicUserProfile, PublicUserProfileWithId } from '@/lib/types';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState<PublicUserProfileWithId[]>([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      const docs: PublicUserProfileWithId[] = [];
      querySnapshot.forEach((doc) => {
        const profile = doc.data() as PublicUserProfile;
        docs.push({
          ...profile,
          id: doc.id,
        });
      });
      setAllUsers(docs);
    }
    fetchData();
  }, []);

  return {
    allUsers,
    setAllUsers,
  };
};
