// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARBUwoyd6FEq8o9X0IH85MmqLY1ZyTzes",
  authDomain: "fiuumber.firebaseapp.com",
  databaseURL: "https://fiuumber-default-rtdb.firebaseio.com",
  projectId: "fiuumber",
  storageBucket: "fiuumber.appspot.com",
  messagingSenderId: "268160515802",
  appId: "1:268160515802:web:b98373b5db6d8ac783afe3",
  measurementId: "G-MH8LWRKSME"
};

// Initialize Firebase
const _app = initializeApp(firebaseConfig);

export const FirebaseService = {
  app: _app,
  db: getDatabase(_app),
  removeTripFromFirebase: async (tripId: string) => {
    const reference = ref(FirebaseService.db, `trips/${tripId}`);
    return remove(reference);
  }
};