import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import {
  getFirestore,
  Firestore,
  CollectionReference,
  collection,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { Chats, PublicUserProfile, UserRelationship } from './types';
import { setMockBulkUserProfile } from './mock/utils';

// .envファイルで設定した環境変数をfirebaseConfigに入れる
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  env: process.env.NEXT_PUBLIC_ENV,
};

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let analytics: Analytics;
let provider: GoogleAuthProvider;
let usersCollectionRef: CollectionReference<PublicUserProfile>;
let relationshipsCollectionRef: CollectionReference<UserRelationship>;
let chatsCollectionRef: CollectionReference<Chats>;

console.log(firebaseConfig);
// サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
if (typeof window !== 'undefined' && !getApps().length) {
  console.log(firebaseConfig);
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  firestore = getFirestore();
  if (firebaseConfig.env === 'development') {
    console.log('DEVELOPMENT');
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  } else {
    console.log('PRODUCTION');
  }
  analytics = getAnalytics(firebaseApp);
  provider = new GoogleAuthProvider();
  usersCollectionRef = collection(
    firestore,
    'users',
  ) as CollectionReference<PublicUserProfile>;
  relationshipsCollectionRef = collection(
    firestore,
    'relationships',
  ) as CollectionReference<UserRelationship>;
  chatsCollectionRef = collection(
    firestore,
    'chats',
  ) as CollectionReference<Chats>;

  if (firebaseConfig.env === 'development') {
    setMockBulkUserProfile();
  }
}
export {
  firebaseApp,
  auth,
  firestore,
  analytics,
  provider,
  usersCollectionRef,
  relationshipsCollectionRef,
  chatsCollectionRef,
};
