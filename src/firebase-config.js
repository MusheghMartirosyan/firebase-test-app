import { initializeApp } from "firebase/app";
import { getFirestore, } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAZOVrUbshesgBbd4BZ0xsKrCC4dxcEB-U",
  authDomain: "fir-test-app-bcd07.firebaseapp.com",
  projectId: "fir-test-app-bcd07",
  storageBucket: "fir-test-app-bcd07.appspot.com",
  messagingSenderId: "446417257996",
  appId: "1:446417257996:web:c22710edf4d0fee6481029"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)