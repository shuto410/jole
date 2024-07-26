// import { fetchPublicUserProfile } from '@/lib/firebaseApi/firestore';
// import { PublicUserProfile } from '@/lib/types';
// import { useContext, useEffect, useState } from 'react';
// import { UserAuthContext } from '@/contexts/user-auth-context';

// export const useLoggedInUserProfile = () => {
//   const [loggedInUserProfile, setLoggedInUserProfile] = useState<
//     PublicUserProfile | undefined
//   >(undefined);
//   const { userId } = useContext(UserAuthContext);

//   useEffect(() => {
//     async function fetchData() {
//       if (userId) {
//         console.log('fetching user profile:', userId);
//         const userProfile = await fetchPublicUserProfile(userId);
//         console.log('userProfile:', userProfile);
//         if (userProfile) {
//           setLoggedInUserProfile(userProfile);
//         } else {
//           setLoggedInUserProfile(undefined);
//         }
//       }
//     }
//     fetchData();
//   }, [userId]);

//   return {
//     loggedInUserProfile,
//   };
// };
