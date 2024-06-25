import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAF_ugGHRaqKvvegvpW94qWlNyWNDIj1Ag",
  authDomain: "todo-app-pesto-tech.firebaseapp.com",
  databaseURL: "https://todo-app-pesto-tech-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-app-pesto-tech",
  storageBucket: "todo-app-pesto-tech.appspot.com",
  messagingSenderId: "907523195356",
  appId: "1:907523195356:web:8f4f07344b033a6e8d0f19"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
