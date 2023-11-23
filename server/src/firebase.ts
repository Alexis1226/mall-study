// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import env from './envLoader';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.fb_apiKey,
  authDomain: env.fb_authDomain,
  projectId: env.fb_projectId,
  storageBucket: env.fb_storageBucket,
  messagingSenderId: env.fb_messagingSenderId,
  appId: env.fb_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);
