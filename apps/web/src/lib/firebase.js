import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTtQ9GSZo7y8H42-zP71y53SehmXYmlOY",
  authDomain: "unnati-2b7e3.firebaseapp.com",
  projectId: "unnati-2b7e3",
  storageBucket: "unnati-2b7e3.firebasestorage.app",
  messagingSenderId: "285528649029",
  appId: "1:285528649029:web:33f69593249aeb7ab9e22c",
  measurementId: "G-T7B0CD0PP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
