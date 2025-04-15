import { initializeApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAq3OfM9kx7xIrToZsFiO4rdpXY9atPh1k",
    authDomain: "chat-with-pdf-e1bf1.firebaseapp.com",
    projectId: "chat-with-pdf-e1bf1",
    storageBucket: "chat-with-pdf-e1bf1.firebasestorage.app",
    messagingSenderId: "216927799138",
    appId: "1:216927799138:web:e4a2142323948dcc178e3b",
    measurementId: "G-5ZQB93E9ZB"
  };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage }; 