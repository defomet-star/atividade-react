import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOFCo1vito2hQiVv80VB9GfhldiTy_VvI",
  authDomain: "atividade-react-nova.firebaseapp.com",
  projectId: "atividade-react-nova",
  storageBucket: "atividade-react-nova.firebasestorage.app",
  messagingSenderId: "466666086741",
  appId: "1:466666086741:web:d10321b37eca03cf450fdc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);