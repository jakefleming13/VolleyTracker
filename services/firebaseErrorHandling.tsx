export type FirebaseErrorCode =
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/invalid-credential'
  | 'auth/too-many-requests'; 

type FirebaseErrorMessages = {
  [key in FirebaseErrorCode]?: string;
};

// Lets us customize the error message, rather than use default dfirebase ones
const errorMessages: FirebaseErrorMessages = {
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/user-disabled': 'This user has been disabled.',
  'auth/user-not-found': 'No user found with this email address.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/email-already-in-use': 'This email is already in use by another account.',
  'auth/weak-password': 'The password is too weak.',
  'auth/invalid-credential': 'Invalid email/password combination.',
  'auth/too-many-requests': 'Too many requests. Please try again later.',
};

export const getFirebaseErrorMessage = (errorCode: FirebaseErrorCode): string => {
  return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
};
