'use server';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { initializeFirebase } from '@/firebase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signupWithEmail(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const { auth } = initializeFirebase();
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
    const { auth } = initializeFirebase();
    await signInWithEmailAndPassword(auth, email, password);
    revalidatePath('/');
    return { status: 'success', message: 'Connexion réussie' };
  } catch (e: any) {
    return { status: 'error', message: e.message };
  }
}

export async function signOut() {
  try {
    const { auth } = initializeFirebase();
    await firebaseSignOut(auth);
  } catch (e: any) {
    return { status: 'error', message: e.message };
  }

  revalidatePath('/');
  redirect('/login');
}
