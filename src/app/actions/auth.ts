'use server';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Helper function for server-side Firebase initialization
function initializeFirebaseServer() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

export async function signupWithEmail(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const firebaseApp = initializeFirebaseServer();
    const auth = getAuth(firebaseApp);
    await createUserWithEmailAndPassword(auth, email, password);
    revalidatePath('/');
    return { status: 'success', message: 'Inscription réussie' };
  } catch (e: any) {
    return { status: 'error', message: e.message };
  }
}

export async function loginWithEmail(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    const firebaseApp = initializeFirebaseServer();
    const auth = getAuth(firebaseApp);
    await signInWithEmailAndPassword(auth, email, password);
    // Revalidation is enough, client-side will handle redirect.
    revalidatePath('/');
    return { status: 'success', message: 'Connexion réussie' };
  } catch (e: any) {
    // Convert Firebase error codes to more user-friendly messages in French
    let message = "Une erreur inconnue est survenue.";
    switch (e.code) {
        case 'auth/invalid-credential':
            message = 'Email ou mot de passe incorrect. Veuillez vérifier vos identifiants.';
            break;
        case 'auth/user-not-found':
            message = 'Aucun compte trouvé avec cette adresse e-mail.';
            break;
        case 'auth/wrong-password':
            message = 'Mot de passe incorrect.';
            break;
        case 'auth/too-many-requests':
             message = 'Accès temporairement désactivé en raison de trop nombreuses tentatives. Réessayez plus tard.';
             break;
    }
    return { status: 'error', message: message };
  }
}

export async function signOut() {
  try {
    const firebaseApp = initializeFirebaseServer();
    const auth = getAuth(firebaseApp);
    await firebaseSignOut(auth);
  } catch (e: any) {
    return { status: 'error', message: e.message };
  }

  revalidatePath('/');
  redirect('/login');
}
