'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore'

let firebaseApp: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (typeof window === 'undefined') {
    // Return a dummy object for server-side rendering
    return {
      firebaseApp: undefined,
      auth: undefined,
      firestore: undefined
    };
  }

  if (!firebaseApp) {
    if (getApps().length === 0) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApp();
    }
    
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);

    if (process.env.NODE_ENV === 'development') {
      // Check if emulators are already running to avoid errors on hot reloads
      // @ts-ignore
      if (auth && !auth.emulatorConfig) {
        connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      }
      // @ts-ignore
      if (firestore && !firestore.emulator) {
        connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      }
    }
  }

  return {
    firebaseApp,
    auth,
    firestore
  };
}

export function getSdks(firebaseApp: FirebaseApp) {
  if (!auth || !firestore) {
    const services = initializeFirebase();
    auth = services.auth;
    firestore = services.firestore;
  }
  return {
    firebaseApp,
    auth: auth!,
    firestore: firestore!,
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
export { useUser } from './auth/use-user';
