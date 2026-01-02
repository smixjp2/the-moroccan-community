'use client';
import { useFirebase } from '@/firebase';
import { User } from 'firebase/auth';

/**
 * Interface for the return value of the useUser hook.
 * This provides the User object, loading status, and any auth errors.
 */
export interface UserHookResult {
  user: User | null; // User object, or null if not authenticated
  isUserLoading: boolean; // True during initial auth state check
  userError: Error | null; // Error from auth listener, if any
}

/**
- * A custom hook to access the authenticated user's state.
- * This simplifies getting the current user without needing to call useFirebase() and destructure.
- *
- * @returns {UserHookResult} An object containing the user, loading state, and error.
- */
export const useUser = (): UserHookResult => {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
};
