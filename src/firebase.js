// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU7otT4DIW_jZqSIaDmsCQ7BHBkquiGr4",
  authDomain: "ecommerce-f381e.firebaseapp.com",
  projectId: "ecommerce-f381e",
  storageBucket: "ecommerce-f381e.appspot.com",
  messagingSenderId: "51548906958",
  appId: "1:51548906958:web:3357593e1a23e3bc0bf79f",
  measurementId: "G-5VPYSETYXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;