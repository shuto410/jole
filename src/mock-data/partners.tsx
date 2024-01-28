import { Message, Partner } from '@/lib/types';

const messages1: Message[] = [
  { isUser: true, text: "Hey, how's going?", arrivedAt: '9:32 PM' },
  {
    isUser: false,
    text: "Hey Sarah! I'm good, thanks. Just got back from that concert we talked about.",
    arrivedAt: '9:32 PM',
  },
  { isUser: true, text: 'No way! How was it?', arrivedAt: '9:32 PM' },
  {
    isUser: false,
    text: 'Amazing! The energy was unreal. You missed out!',
    arrivedAt: '9:34 PM',
  },
  {
    isUser: true,
    text: 'Ugh, I know! Next time for sure.',
    arrivedAt: '9:52 PM',
  },
  {
    isUser: false,
    text: "Definitely. We'll plan it better.",
    arrivedAt: '9:53 PM',
  },
  {
    isUser: true,
    text: "By the way, did you finish that project for Monday's meeting?",
    arrivedAt: '9:56 PM',
  },
  {
    isUser: false,
    text: 'Not yet, still ironing out a few details. How about you?',
    arrivedAt: '10:02 PM',
  },
  {
    isUser: true,
    text: "Almost there. I'll ping you the draft by tonight.",
    arrivedAt: '10:30 PM',
  },
  {
    isUser: false,
    text: "Cool, thanks! You're a lifesaver.",
    arrivedAt: '10:32 PM',
  },
  {
    isUser: true,
    text: 'No worries. Team effort, right?',
    arrivedAt: '19:19 PM',
  },
  {
    isUser: false,
    text: 'Absolutely. Anyway, gotta run. Talk later?',
    arrivedAt: '23:56 PM',
  },
  {
    isUser: true,
    text: 'For sure! Take care.',
    arrivedAt: '9:32 PM',
  },
];

const messages2: Message[] = [
  { isUser: true, text: "hey what's up", arrivedAt: '9:32 PM' },
  {
    isUser: false,
    text: "hey I'm not good",
    arrivedAt: '9:32 PM',
  },
  { isUser: true, text: 'what happened to you', arrivedAt: '9:32 PM' },
  {
    isUser: false,
    text: 'yeah, not that big deal, but I broke my phone',
    arrivedAt: '9:34 PM',
  },
  {
    isUser: true,
    text: 'oh gosh, feel bad',
    arrivedAt: '9:32 PM',
  },
];

const messages3: Message[] = [
  { isUser: true, text: 'hello? please reply asap', arrivedAt: '9:32 PM' },
];
export const getMockPartners = () => {
  const mockPartners: Partner[] = [];
  mockPartners.push(...partners);
  mockPartners.push(...partners);
  mockPartners.push(...partners);
  mockPartners.push(...partners);
  return mockPartners;
};

const partners = [
  {
    imageUrl: 'https://picsum.photos/seed/mike/200/200',
    userName: 'Mike',
    lastMessage: 'Hello Jack, how was the party you talked about before',
    messages: messages1,
  },
  {
    imageUrl: 'https://picsum.photos/seed/jonh/200/200',
    userName: 'John',
    lastMessage: 'What do you mean by that? I just thought you were',
    messages: messages2,
  },
  {
    imageUrl: 'https://picsum.photos/seed/ben/200/200',
    userName: 'Ben',
    lastMessage: 'wtf are you kidding me? you know who I am',
    messages: messages3,
  },
  {
    imageUrl: 'https://picsum.photos/seed/ken/200/200',
    userName: 'Ken',
    lastMessage: 'Sorry, I missed your message. Let me go over again',
    messages: messages1,
  },
  {
    imageUrl: 'https://picsum.photos/seed/anna/200/200',
    userName: 'Anna',
    lastMessage: 'what? you mean I should do that shit??',
    messages: messages3,
  },
];
