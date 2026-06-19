import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJonJSTEmhbrgqNdWAUrB4fudCLg_RSVo",
  authDomain: "indigo-outrider-6k8sk.firebaseapp.com",
  projectId: "indigo-outrider-6k8sk",
  storageBucket: "indigo-outrider-6k8sk.firebasestorage.app",
  messagingSenderId: "588279023718",
  appId: "1:588279023718:web:8fa9d771a340f6c8a745a7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Standard scopes for OAuth
googleProvider.addScope("profile");
googleProvider.addScope("email");

export {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
};
export type { FirebaseUser };
