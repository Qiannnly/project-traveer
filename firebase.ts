import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_REACT_NATIVE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_REACT_NATIVE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_REACT_NATIVE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_REACT_NATIVE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_REACT_NATIVE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_REACT_NATIVE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
