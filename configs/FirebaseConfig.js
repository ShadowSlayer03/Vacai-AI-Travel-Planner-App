import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKNapQxSbpr6XIaqzuRCSCjdVM9lMtS64",
  authDomain: "vacai-ai-travel-planner.firebaseapp.com",
  projectId: "vacai-ai-travel-planner",
  storageBucket: "vacai-ai-travel-planner.appspot.com",
  messagingSenderId: "209704317133",
  appId: "1:209704317133:web:1fcbb2ddaf3623c0e17984",
  measurementId: "G-YBP647Q0S8"
};

const app = initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  if (e.code === 'auth/already-initialized') {
    auth = getAuth(app); // If already initialized, use the existing auth instance
  } else {
    throw e; // Rethrow other errors
  }
}

export { auth };
