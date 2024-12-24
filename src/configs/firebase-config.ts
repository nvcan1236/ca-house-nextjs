/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import envConfig from "./env-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: envConfig.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: envConfig.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
  projectId: envConfig.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
  storageBucket: envConfig.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: envConfig.NEXT_PUBLIC_GOOGLE_MESSAGING_SENDER_ID,
  appId: envConfig.NEXT_PUBLIC_GOOGLE_APP_ID,
  measurementId: envConfig.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app 