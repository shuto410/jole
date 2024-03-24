import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  relationshipsCollectionRef,
  usersCollectionRef,
  chatsCollectionRef,
  firestore,
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

export const fetchRequestingUsers = async (uid: string) => {
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

export const fetchPartnerUserIds = async (uid: string) => {
  const userRelationship = await fetchUserRelationship(uid);
  return userRelationship?.partnerUserIds || [];
};

//COMMENT: fetch partners
export const fetchPartnerProfiles = async (uid: string) => {
  const partnerUserIds = await fetchPartnerUserIds(uid);
  if (partnerUserIds.length === 0) {
    return [];
  }

  const partnerUserProfiles = await Promise.all(
    partnerUserIds.map(async (uid: string) => {
      return {
        uid: uid,
        ...(await fetchPublicUserProfile(uid)),
      };
    }),
  );

  return partnerUserProfiles.filter(
    (profile) => profile !== null,
  ) as (PublicUserProfile & { uid: string })[];
};

export const fetchAllChats = async (uid: string) => {
  const chatsDocRef = doc(chatsCollectionRef, uid);
  const chatsDocSnap = await getDoc(chatsDocRef);
  if (chatsDocSnap.exists()) {
    return chatsDocSnap.data();
  }
  return {};
};

export const fetchChatMessages = async (uid: string, partnerId: string) => {
  try {
    const chatsDocRef = doc(chatsCollectionRef, uid);
    const chatsDocSnap = await getDoc(chatsDocRef);
    if (chatsDocSnap.exists()) {
      const chats = chatsDocSnap.data();
      const chat = chats[partnerId];
      if (!chat) {
        throw new Error(
          `partner's user id ${partnerId} not found in the database of chats.`,
        );
      }
      return chat.messages;
    }
    return [];
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

// COMMENT: use this function and check
export const sendPartnerRequest = async (uid: string, targetUserId: string) => {
  const userRelationship = await fetchUserRelationship(uid);
  if (!userRelationship) {
    return;
  }

  const { requestingUserIds } = userRelationship;
  if (requestingUserIds.includes(targetUserId)) {
    return;
  }

  const targetUserRelationship = await fetchUserRelationship(uid);
  if (!targetUserRelationship) return;

  const { pendingRequestUserIds } = targetUserRelationship;
  const newPendingRequestUserIds = [...pendingRequestUserIds, targetUserId];
  const newTargetUserRelationship = {
    ...targetUserRelationship,
    pendingRequestUserIds: newPendingRequestUserIds,
  };
  await updateDoc(
    doc(firestore, 'relationships', targetUserId),
    newTargetUserRelationship,
  );
};
