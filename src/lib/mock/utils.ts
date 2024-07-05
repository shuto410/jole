import { doc, setDoc } from 'firebase/firestore';
import { PublicUserProfile } from '../types';
import { firestore } from '../firebaseConfig';
import { mockUserProfiles } from './data/public-user-profiles';
import { generateRandomUserProfiles } from './data/generate-random-user-profiles';

const setUserProfile = async (
  userProfile: PublicUserProfile,
  userId: string,
) => {
  try {
    await setDoc(doc(firestore, 'users', userId), userProfile);
    console.log('Document written');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const setMockBulkUserProfile = async () => {
  setUserProfile(
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
  generateRandomUserProfiles(30).forEach(async (userProfile, index) => {
    await setUserProfile(userProfile, `user${userProfile.name}${index}`);
  });

  mockUserProfiles.forEach(async (userProfile, index) => {
    await setUserProfile(userProfile, `user-manual-${index}`);
  });
};
