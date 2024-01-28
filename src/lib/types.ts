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
  isUser: boolean;
  text: string;
  arrivedAt?: `${number}:${number} ${'PM' | 'AM'}`;
};
