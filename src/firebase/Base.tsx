import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const ENV =  import.meta.env

const firebaseConfig = {
  apiKey: ENV.VITE_API_KEY,
  authDomain: ENV.VITE_AUTH_DOMAIN,
  projectId: ENV.VITE_PROJECT_ID,
  storageBucket: ENV.VITE_STORAGE_BUCKET,
  messagingSenderId: ENV.VITE_MESSAGING_SENDER_ID,
  appId: ENV.VITE_APP_ID,
  measurementId: ENV.VITE_MEASUREMENT_ID
}; 

console.log("ENV" , import.meta.env.MODE)

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)