import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const ENV = import.meta.env;

// const firebaseConfig = {
//    apiKey: ENV.VITE_API_KEY,
//    authDomain: ENV.VITE_AUTH_DOMAIN,
//    projectId: ENV.VITE_PROJECT_ID,
//    storageBucket: ENV.VITE_STORAGE_BUCKET,
//    messagingSenderId: ENV.VITE_MESSAGING_SENDER_ID,
//    appId: ENV.VITE_APP_ID,
//    measurementId: ENV.VITE_MEASUREMENT_ID,
// };

const firebaseConfig = {
   apiKey: "AIzaSyDmOndmRn3F51JeLcl94mQ-7JouqUv1Ce8",
   authDomain: "rhu-prod.firebaseapp.com",
   projectId: "rhu-prod",
   storageBucket: "rhu-prod.appspot.com",
   messagingSenderId: "713912225365",
   appId: "1:713912225365:web:ba02f02cb10a34249e4edc",
   measurementId: "G-VYV614B80N",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
