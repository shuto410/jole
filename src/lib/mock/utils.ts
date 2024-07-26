import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { PublicUserProfile } from '../types';
import { firestore } from '../firebaseConfig';
import { generateRandomUserProfiles } from './data/generate-random-user-profiles';
import {
  setChats,
  setUserProfile,
  setUserRelationship,
} from '../firebaseApi/firestore';

const deleteAllUserProfiles = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'users'));
  const batch = writeBatch(firestore);

  querySnapshot.forEach((document) => {
    batch.delete(doc(firestore, 'users', document.id));
  });

  await batch.commit();
};

const addMockUser = async (userProfile: PublicUserProfile, uid: string) => {
  await setUserProfile(userProfile, uid);
  await setUserRelationship(
    {
      pendingRequestUserIds: [],
      requestingUserIds: [],
      partnerUserIds: [],
    },
    uid,
  );
  await setChats({}, uid);
};

export const setMockBulkUserProfile = async () => {
  await deleteAllUserProfiles();
  await addMockUser(
    {
      name: 'Takumi',
      age: 27,
      keywords: [{ label: 'Manga' }],
      language: 'Japanese',
      targetLanguage: 'English',
      selfIntroduction:
        'Hello, I am Takumi. I love reading Manga and I am fluent in Japanese. I am learning English and would love to practice with someone.',
    },
    'xCCwgPHeizTxp0SLEK6O89sE3nI3',
  );
  await addMockUser(
    {
      name: 'Another Takumi',
      age: 28,
      keywords: [{ label: 'Anime' }, { label: 'Manga' }],
      language: 'Japanese',
      targetLanguage: 'English',
      selfIntroduction:
        'Hello, I am Another Takumi. I love reading Manga and I am fluent in Japanese. I am learning English and would love to practice with someone.',
    },
    'fZcvEwPYGibLMXao07tIqwvlBUp2',
  );

  generateRandomUserProfiles(20).forEach(async (userProfile, index) => {
    await addMockUser(userProfile, `user${userProfile.name}${index}`);
  });
};
