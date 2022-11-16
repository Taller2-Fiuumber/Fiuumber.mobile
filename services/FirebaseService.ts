// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove, set } from "firebase/database";
import { LatLng } from "react-native-maps";
import { TripStatus } from "../enums/trip-status";
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
  removeRequestedTrip: async (tripId: string) => {
    const reference = ref(FirebaseService.db, `trips/${TripStatus.Requested}/${tripId}`);
    return remove(reference);
  },
  appendRequestedTrip: async (tripId: string) => {
    const reference = ref(FirebaseService.db, `trips/${TripStatus.Requested}/${tripId}`);
    return set(reference, {
      tripId: tripId,
      status: TripStatus.Requested,
    });
  },
  updateDriverLocation: async (tripId: string, location: LatLng) => {
    const reference = ref(FirebaseService.db, `trips/${tripId}`);
    return set(reference, {
      locationDriver: location
    });
  },
  updatePassengerLocation: async (tripId: string, location: LatLng) => {
    const reference = ref(FirebaseService.db, `trips/${tripId}`);
    return set(reference, {
      locationPassenger: location
    });
  },
  updateTripStatus: async (tripId: string, status: string) => {
    const reference = ref(FirebaseService.db, `trips/${tripId}`);
    return set(reference, {
      status,
    });
  },
};