import { Partner } from './page';

const messages = [
  { isUsers: true, message: "Hey, how's going?" },
  {
    isUsers: false,
    message:
      "Hey Sarah! I'm good, thanks. Just got back from that concert we talked about.",
  },
  { isUsers: true, message: 'No way! How was it?' },
  {
    isUsers: false,
    message: 'Amazing! The energy was unreal. You missed out!',
  },
  { isUsers: true, message: 'Ugh, I know! Next time for sure.' },
  { isUsers: false, message: "Definitely. We'll plan it better." },
  {
    isUsers: true,
    message: "By the way, did you finish that project for Monday's meeting?",
  },
  {
    isUsers: false,
    message: 'Not yet, still ironing out a few details. How about you?',
  },
  {
    isUsers: true,
    message: "Almost there. I'll ping you the draft by tonight.",
  },
  { isUsers: false, message: "Cool, thanks! You're a lifesaver." },
  {
    isUsers: true,
    message: 'No worries. Team effort, right?',
  },
  { isUsers: false, message: 'Absolutely. Anyway, gotta run. Talk later?' },
  {
    isUsers: true,
    message: 'For sure! Take care.',
  },
];

export const getMockPartners = () => {
  const mockPartners: Partner[] = [];
  mockPartners.push(...temp);
  mockPartners.push(...temp);
  mockPartners.push(...temp);
  mockPartners.push(...temp);
  return mockPartners;
};

const temp = [
  {
    imageUrl: 'https://picsum.photos/seed/mike/200/200',
    userName: 'Mike',
    lastMessage: 'Hello Jack, how was the party you talked about before',
    messages,
  },
  {
    imageUrl: 'https://picsum.photos/seed/jonh/200/200',
    userName: 'John',
    lastMessage: 'What do you mean by that? I just thought you were',
    messages,
  },
  {
    imageUrl: 'https://picsum.photos/seed/ben/200/200',
    userName: 'Ben',
    lastMessage: 'wtf are you kidding me? you know who I am',
    messages,
  },
  {
    imageUrl: 'https://picsum.photos/seed/ken/200/200',
    userName: 'Ken',
    lastMessage: 'Sorry, I missed your message. Let me go over again',
    messages,
  },
  {
    imageUrl: 'https://picsum.photos/seed/anna/200/200',
    userName: 'Anna',
    lastMessage: 'what? you mean I should do that shit??',
    messages,
  },
];
