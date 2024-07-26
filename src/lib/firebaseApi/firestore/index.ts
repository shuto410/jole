import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  relationshipsCollectionRef,
  usersCollectionRef,
  chatsCollectionRef,
  firestore,
} from '@/lib/firebaseConfig';
import {
  Chat,
  Chats,
  Message,
  PublicUserProfile,
  PublicUserProfileWithId,
  UserRelationship,
} from '../../types';

export const setUserProfile = async (
  userProfile: PublicUserProfile,
  userId: string,
) => {
  try {
    await setDoc(doc(firestore, 'users', userId), userProfile);
    console.log('Document written, userProfile: ', userProfile);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const fetchPublicUserProfile = async (uid: string) => {
  const userDocRef = doc(usersCollectionRef, uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  }
  return null;
};

export const fetchAllPublicUserProfilesWithId = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'users'));
  const docs: PublicUserProfileWithId[] = [];
  querySnapshot.forEach((doc) => {
    const profile = doc.data() as PublicUserProfile;
    docs.push({
      ...profile,
      id: doc.id,
    });
  });
  return docs;
};

export const setUserRelationship = async (
  relationship: UserRelationship,
  uid: string,
) => {
  await setDoc(doc(firestore, 'relationships', uid), relationship);
};

export const fetchUserRelationship = async (uid: string) => {
  const relationshipDocRef = doc(relationshipsCollectionRef, uid);
  const relationshipDocSnap = await getDoc(relationshipDocRef);

  if (relationshipDocSnap.exists()) {
    return relationshipDocSnap.data();
  }
  return null;
};

export const fetchPendingRequestingUsers = async (
  uid: string,
): Promise<PublicUserProfileWithId[]> => {
  const userRelationship = await fetchUserRelationship(uid);

  const pendingRequestingUserIds = userRelationship?.pendingRequestUserIds;
  if (!pendingRequestingUserIds) {
    return [];
  }

  const requestingUserProfiles: (PublicUserProfileWithId | null)[] =
    await Promise.all(
      pendingRequestingUserIds.map(async (uid: string) => {
        const profile = await fetchPublicUserProfile(uid);
        return profile ? { ...profile, id: uid } : null;
      }),
    );

  return requestingUserProfiles.filter(
    (profile): profile is PublicUserProfileWithId => profile !== null,
  );
};

export const fetchPartnerUserIds = async (uid: string) => {
  const userRelationship = await fetchUserRelationship(uid);
  return userRelationship?.partnerUserIds || [];
};

export const fetchPartnerProfiles = async (uid: string) => {
  const partnerUserIds = await fetchPartnerUserIds(uid);
  if (partnerUserIds.length === 0) {
    return [];
  }

  const partnerUserProfiles: (PublicUserProfileWithId | null)[] =
    await Promise.all(
      partnerUserIds.map(async (uid: string) => {
        const profile = await fetchPublicUserProfile(uid);
        return profile
          ? {
              ...profile,
              id: uid,
            }
          : null;
      }),
    );

  return partnerUserProfiles.filter(
    (profile): profile is PublicUserProfileWithId => profile !== null,
  );
};

export const setChats = async (chats: Chats, uid: string) => {
  await setDoc(doc(firestore, 'chats', uid), chats);
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

export const sendPartnerRequest = async (uid: string, targetUserId: string) => {
  const userRelationship = await fetchUserRelationship(uid);
  console.log('Sending Partner Request, userRelationship: ', userRelationship);
  if (!userRelationship) {
    return;
  }

  const { requestingUserIds } = userRelationship;
  if (requestingUserIds.includes(targetUserId)) {
    return;
  }

  const newUserRequestingUserIds = [...requestingUserIds, targetUserId];
  const newUserRelationship: UserRelationship = {
    ...userRelationship,
    requestingUserIds: newUserRequestingUserIds,
  };
  await updateDoc(doc(firestore, 'relationships', uid), newUserRelationship);

  const targetUserRelationship = await fetchUserRelationship(targetUserId);
  if (!targetUserRelationship) return;

  const { pendingRequestUserIds } = targetUserRelationship;
  const newPendingRequestUserIds = [...pendingRequestUserIds, uid];
  const newTargetUserRelationship = {
    ...targetUserRelationship,
    pendingRequestUserIds: newPendingRequestUserIds,
  };
  await updateDoc(
    doc(firestore, 'relationships', targetUserId),
    newTargetUserRelationship,
  );
  console.log('Partner Request sent');
};

export const sendApproveRequest = async (uid: string, targetUserId: string) => {
  try {
    const userRelationship = await fetchUserRelationship(uid);
    if (!userRelationship) {
      return;
    }

    const { pendingRequestUserIds } = userRelationship;
    if (!pendingRequestUserIds.includes(targetUserId)) {
      return;
    }

    // Remove targetUserId from pendingRequestUserIds
    const newPendingRequestUserIds = pendingRequestUserIds.filter(
      (id) => id !== targetUserId,
    );
    const newUserRelationship: UserRelationship = {
      ...userRelationship,
      pendingRequestUserIds: newPendingRequestUserIds,
      partnerUserIds: [...userRelationship.partnerUserIds, targetUserId],
    };
    await updateDoc(doc(firestore, 'relationships', uid), newUserRelationship);

    // Also update the target user's relationship to include the current user in their approved list
    const targetUserRelationship = await fetchUserRelationship(targetUserId);
    if (!targetUserRelationship) return;

    const { requestingUserIds } = targetUserRelationship;
    if (!requestingUserIds.includes(uid)) {
      return;
    }

    const newTargetUserRequestingUserIds = requestingUserIds.filter(
      (id) => id !== uid,
    );
    const newTargetUserRelationship: UserRelationship = {
      ...targetUserRelationship,
      requestingUserIds: newTargetUserRequestingUserIds,
      partnerUserIds: [...targetUserRelationship.partnerUserIds, uid],
    };
    await updateDoc(
      doc(firestore, 'relationships', targetUserId),
      newTargetUserRelationship,
    );

    const chats = await fetchAllChats(uid);
    await setChats(
      {
        ...chats,
        [uid]: {
          messages: [],
        },
      },
      uid,
    );
  } catch (e) {
    console.error('Error approving request: ', e);
  }
};

export const sendChatMessage = async (
  uid: string,
  partnerId: string,
  message: string,
) => {
  const userChats = await fetchAllChats(uid);
  const partnerChats = await fetchAllChats(partnerId);

  const userChat = userChats[partnerId] || { messages: [] };
  const partnerChat = partnerChats[uid] || { messages: [] };

  const newMessage: Message = {
    uid,
    text: message,
    sentAt: new Date().getTime(),
  };

  const newUserChat: Chat = {
    ...userChat,
    messages: [...userChat.messages, newMessage],
  };
  const newPartnerChat: Chat = {
    ...partnerChat,
    messages: [...partnerChat.messages, newMessage],
  };

  await updateDoc(doc(firestore, 'chats', uid), {
    ...userChats,
    [partnerId]: newUserChat,
  });
  await updateDoc(doc(firestore, 'chats', partnerId), {
    ...partnerChats,
    [uid]: newPartnerChat,
  });
};
