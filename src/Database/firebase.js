
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvQonPbJvuZy61OAxQ0ydXNkOOBFqyXG4",
  authDomain: "chat-app-aa1bf.firebaseapp.com",
  projectId: "chat-app-aa1bf",
  // storageBucket: "chat-app-aa1bf.firebasestorage.app",
  storageBucket: "chat-app-aa1bf.appspot.com",
  messagingSenderId: "224272066631",
  appId: "1:224272066631:web:739597c9fd98bbbda9e962"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

