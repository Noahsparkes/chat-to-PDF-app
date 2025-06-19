import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };


// import { initializeApp,getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyAq3OfM9kx7xIrToZsFiO4rdpXY9atPh1k",
//     authDomain: "chat-with-pdf-e1bf1.firebaseapp.com",
//     projectId: "chat-with-pdf-e1bf1",
//     storageBucket: "chat-with-pdf-e1bf1.firebasestorage.app",
//     messagingSenderId: "216927799138",
//     appId: "1:216927799138:web:e4a2142323948dcc178e3b",
//     measurementId: "G-5ZQB93E9ZB"
//   };

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// const db = getFirestore(app);
// const storage = getStorage(app);

// export { app, db, storage }; 