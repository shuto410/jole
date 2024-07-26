import { fetchAllPublicUserProfilesWithId } from '@/lib/firebaseApi/firestore';
import { PublicUserProfileWithId } from '@/lib/types';
import { useEffect, useState } from 'react';

export const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState<PublicUserProfileWithId[]>([]);

  useEffect(() => {
    async function fetchData() {
      setAllUsers(await fetchAllPublicUserProfilesWithId());
    }
    fetchData();
  }, []);

  return {
    allUsers,
  };
};
