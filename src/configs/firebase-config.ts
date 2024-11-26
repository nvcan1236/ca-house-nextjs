/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLiHDNuhrAnNS8xmtUyYMA0hyts4Wbzk4",
  authDomain: "toca-motel.firebaseapp.com",
  projectId: "toca-motel",
  storageBucket: "toca-motel.appspot.com",
  messagingSenderId: "406903117972",
  appId: "1:406903117972:web:6f56f9e18f9f81b2a2bc81",
  measurementId: "G-YR3NYBMJ22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app 