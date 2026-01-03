'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

let firebaseApp: FirebaseApp;

// Initialize Firebase
if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Check if emulators are already running to avoid errors on hot reloads
  // @ts-ignore
  if (!auth.emulatorConfig) {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  }
  // @ts-ignore
  if (!firestore.emulator) {
     connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  }
}

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  return {
    firebaseApp,
    auth,
    firestore
  };
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth,
    firestore
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
export * from './auth/use-user';
