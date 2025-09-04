import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone10021972.firebaseapp.com",
  projectId: "netflix-clone10021972",
  storageBucket: "netflix-clone10021972.firebasestorage.app",
  messagingSenderId: "699244149462",
  appId: "1:699244149462:web:c64a181089d6492a8d6777"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };


