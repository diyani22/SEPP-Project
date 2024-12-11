import { initializeApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlS3URYvS_b--ls4Pud7IcRV6WlU4RjNw",
  authDomain: "sepp-project.firebaseapp.com",
  projectId: "sepp-project",
  storageBucket: "sepp-project.firebasestorage.app",
  messagingSenderId: "948590273784",
  appId: "1:948590273784:web:7a41a180038b94fb8f470d",
  measurementId: "G-LF2GWLEY1Y"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let analytics: Analytics | null = null;

if (typeof window != 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics, db };
