// Lets us customize the error message, rather than use default Firebase ones
const errorMessages = {
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/user-disabled': 'This user has been disabled.',
  'auth/user-not-found': 'No user found with this email address.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/email-already-in-use': 'This email is already in use by another account.',
  'auth/weak-password': 'The password is too weak.',
  'auth/invalid-credential': 'Invalid email/password combination.',
  'auth/too-many-requests': 'Too many requests. Please try again later.',
};

export const getFirebaseErrorMessage = (errorCode) => {
  return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
};
