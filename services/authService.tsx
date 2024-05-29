
import auth from '@react-native-firebase/auth';


// Sign in the user
export const signIn = async (email: string, password: string): Promise<void> => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log('User signed in!');
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      console.log('No user corresponding to this email.');
    } else if (error.code === 'auth/wrong-password') {
      console.log('Incorrect password.');
    } else {
      console.error(error);
    }
  }
};

// register new user
export const signUp = async (email: string, password: string): Promise<void> => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created & signed in!');
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    } else {
      console.error(error);
    }
  }
};
