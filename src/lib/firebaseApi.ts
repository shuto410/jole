import { doc, getDoc } from 'firebase/firestore';
import {
  relationshipsCollectionRef,
  usersCollectionRef,
} from '@/lib/firebaseConfig';
import { PublicUserProfile } from './types';

export const fetchPublicUserProfile = async (uid: string) => {
  const userDocRef = doc(usersCollectionRef, uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  }
  return null;
};

export const fetchUserRelationship = async (uid: string) => {
  const relationshipDocRef = doc(relationshipsCollectionRef, uid);
  const relationshipDocSnap = await getDoc(relationshipDocRef);

  if (relationshipDocSnap.exists()) {
    return relationshipDocSnap.data();
  }
  return null;
};

export const fetchRequestingUserRelationship = async (uid: string) => {
  const userRelationship = await fetchUserRelationship(uid);

  const requestingUserIds = userRelationship?.pendingRequestUserIds;
  if (!requestingUserIds) {
    return [];
  }

  const requestingUserProfiles = await Promise.all(
    requestingUserIds.map(async (uid: string) => {
      return await fetchPublicUserProfile(uid);
    }),
  );

  return requestingUserProfiles.filter(
    (profile) => profile !== null,
  ) as PublicUserProfile[];
};
