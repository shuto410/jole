import { Language, PublicUserProfile } from '@/lib/types';

export const generateRandomUserProfiles = (
  size: number,
): PublicUserProfile[] => {
  const randomUsers: PublicUserProfile[] = [];

  for (let i = 0; i < size; i++) {
    const user: PublicUserProfile = {
      name: generateRandomName(),
      age: generateRandomAge(),
      targetLanguage: generateRandomLanguage(),
      language: generateRandomLanguage(),
      keywords: generateRandomKeywords(),
      selfIntroduction: generateRandomSelfIntroduction(),
    };

    randomUsers.push(user);
  }

  return randomUsers;
};

const generateRandomName = (): string => {
  const firstNames = [
    'John',
    'Jane',
    'Michael',
    'Emily',
    'David',
    'Sarah',
    'Daniel',
    'Olivia',
    'Matthew',
    'Sophia',
    'Takeru',
    'Takashi',
    'Kaori',
    'Miyako',
    'Emiko',
    'Ayane',
    'Ken',
    'Yuki',
    'Haruto',
    'Sakura',
    'Rin',
    'Hikari',
    'Haruka',
    'Riku',
    'Kaito',
  ];
  const lastNames = [
    'Doe',
    'Smith',
    'Johnson',
    'Davis',
    'Brown',
    'Wilson',
    'Taylor',
    'Anderson',
    'Martinez',
    'Thomas',
    'Sato',
    'Tanaka',
    'Watanabe',
    'Yamamoto',
    'Nakamura',
    'Kobayashi',
    'Kato',
    'Ito',
    'Yoshida',
    'Suzuki',
  ];
  const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
  const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
  const firstName = firstNames[randomFirstNameIndex];
  const lastName = lastNames[randomLastNameIndex];
  return `${firstName} ${lastName}`;
};

const generateRandomAge = (): number => {
  const minAge = 18;
  const maxAge = 60;
  return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
};

const generateRandomLanguage = (): Language => {
  const languages: Language[] = ['English', 'Japanese'];
  const randomIndex = Math.floor(Math.random() * languages.length);
  return languages[randomIndex];
};

const generateRandomKeywords = (): { label: string }[] => {
  const keywords = new Set<string>();
  const numKeywords = Math.floor(Math.random() * 3) + 1;
  const availableKeywords = [
    'Manga',
    'Game',
    'Novel',
    'Anime',
    'JPOP',
    'Sushi',
  ];

  for (let i = 0; i < numKeywords; i++) {
    const randomIndex = Math.floor(Math.random() * availableKeywords.length);
    const keyword = availableKeywords[randomIndex];
    keywords.add(keyword);
  }

  return Array.from(keywords, (keyword) => ({ label: keyword }));
};

const generateRandomSentence = (): string => {
  const subjects = [
    'I',
    'My father',
    'My sister',
    'My brother',
    'My mother',
    'My family',
    'My cat',
    'My dog',
  ];
  const verbs = [
    'love',
    'enjoy',
    'like',
    'dislike',
    'hate',
    'appreciate',
    'admire',
    'desire',
    'prefer',
    'need',
  ];
  const objects = [
    'programming',
    'reading',
    'playing games',
    'listening to music',
    'watching movies',
    'traveling',
    'cooking',
    'exercising',
    'painting',
    'learning new things',
  ];
  const randomSubjectIndex = Math.floor(Math.random() * subjects.length);
  const randomVerbIndex = Math.floor(Math.random() * verbs.length);
  const randomObjectIndex = Math.floor(Math.random() * objects.length);
  const subject = subjects[randomSubjectIndex];
  const verb = verbs[randomVerbIndex];
  const object = objects[randomObjectIndex];
  return `${subject} ${verb} ${object}.`;
};

const generateRandomSelfIntroduction = (): string => {
  const intros = [
    "Hello! I'm John. Let's connect and chat!",
    "Hi there! I'm Jane. Looking forward to meeting new people!",
    "Hey! I'm Michael. Let's have a conversation!",
    "Greetings! I'm Emily. Let's connect and share our interests!",
    "Hi! I'm David. Excited to meet like-minded individuals!",
    "Nice to meet you! I'm Sarah. Let's explore new opportunities!",
    "Hello, everyone! I'm Daniel. Let's collaborate and create something amazing!",
    "Hey there! I'm Olivia. Let's connect and inspire each other!",
    "Greetings, fellow enthusiasts! I'm Matthew. Let's dive into exciting discussions!",
    "Hi, I'm Sophia. Let's embark on a journey of knowledge and growth!",
  ];
  const randomIndex = Math.floor(Math.random() * intros.length);
  const randomIntro = intros[randomIndex];
  const randomSentence1 = generateRandomSentence();
  const randomSentence2 = generateRandomSentence();
  return `${randomIntro} ${randomSentence1} ${randomSentence2}`;
};
