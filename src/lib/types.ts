export type PublicUserProfile = {
  name: string;
  imageUrl?: string;
  age: number;
  keywords: {
    label: string;
    link: string;
  }[];
  language: 'Japanese' | 'English';
  targetLanguage: 'Japanese' | 'English';
  selfIntroduction?: string;
};

export type PublicUserProfileWithId = PublicUserProfile & {
  id: string;
};

export type UserRelationship = {
  pendingRequestUserIds: string[];
  requestingUserIds: string[];
  partnerUserIds: string[];
};

export type Partner = {
  userName: string;
  imageUrl: string;
  lastMessage: string;
  messages: Message[];
};

export type Message = {
  uid: string;
  text: string;
  sentAt: number; // UNIX Timestamp
};

export type Chats = {
  [uid: string]: Chat;
};

export type Chat = {
  messages: Message[];
};
