import { Language, PublicUserProfile } from '@/lib/types';

export const mockUserProfiles: PublicUserProfile[] = [
  {
    name: 'Ayaka',
    age: 20,
    targetLanguage: 'Japanese',
    language: 'English',
    keywords: [
      {
        label: 'Sushi',
      },
    ],
    selfIntroduction:
      "Hello! I'm Ayaka. I'm passionate about learning languages and exploring different cultures. I enjoy trying new foods, especially sushi. Let's connect and practice our language skills together!",
  },
  {
    name: 'Mike',
    age: 20,
    targetLanguage: 'Japanese',
    language: 'English',
    keywords: [
      {
        label: 'Manga',
      },
      {
        label: 'Anime',
      },
      {
        label: 'JPOP',
      },
    ],
    selfIntroduction:
      "Hi there! I'm Mike. I have a deep love for Japanese culture, especially manga, anime, and JPOP. I'm also interested in data analysis and enjoy exploring new ideas. Let's chat and share our interests!",
  },
  {
    name: 'John',
    age: 27,
    targetLanguage: 'Japanese',
    language: 'English',
    keywords: [
      {
        label: 'Manga',
      },
      {
        label: 'Game',
      },
    ],
    selfIntroduction:
      "Hey! I'm John. I'm a big fan of manga and video games. I love diving into new worlds and exploring different storytelling mediums. Let's connect and have fun discussing our favorite manga and games!",
  },
  {
    name: 'Anna',
    age: 24,
    targetLanguage: 'Japanese',
    language: 'English',
    keywords: [
      {
        label: 'Novel',
      },
      {
        label: 'Game',
      },
    ],
    selfIntroduction:
      "Hi! I'm Anna. I enjoy reading novels and playing games in my free time. I'm always looking for new recommendations and love discussing interesting stories. Let's chat and share our favorite books and games!",
  },
  {
    name: 'Ken',
    targetLanguage: 'Japanese',
    language: 'English',
    age: 30,
    keywords: [
      {
        label: 'Manga',
      },
      {
        label: 'Game',
      },
    ],
    selfIntroduction:
      "Hello! I'm Ken. I'm a big fan of manga and video games. I enjoy analyzing data and uncovering hidden patterns. Let's connect and discuss our favorite manga, games, and data analysis techniques!",
  },
  {
    name: 'Mika',
    age: 19,
    targetLanguage: 'Japanese',
    language: 'English',
    keywords: [
      {
        label: 'Manga',
      },
      {
        label: 'Game',
      },
    ],
    selfIntroduction:
      "Hey there! I'm Mika. I'm passionate about manga and video games. I love exploring new worlds and immersing myself in captivating stories. Let's connect and share our favorite manga and games!",
  },
];
