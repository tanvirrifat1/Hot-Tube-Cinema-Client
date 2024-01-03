import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChP83IuE98dTDFsdqTpjjYE7ZdfWZtlY0",
  authDomain: "hot-tube-cinema.firebaseapp.com",
  projectId: "hot-tube-cinema",
  storageBucket: "hot-tube-cinema.appspot.com",
  messagingSenderId: "159244782734",
  appId: "1:159244782734:web:5f43a143d38624ce88cddf",
};

export const app = initializeApp(firebaseConfig);
