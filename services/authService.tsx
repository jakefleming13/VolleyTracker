import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
// Custom error codes 
import { getFirebaseErrorMessage, FirebaseErrorCode } from '../services/firebaseErrorHandling';

// Sign in the user
export const signIn = async (email: string, password: string): Promise<void> => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
      } catch (error: any) {
        const message = getFirebaseErrorMessage(error.code as FirebaseErrorCode);
        Alert.alert('Login Failed', message);
      }
};

// register new user
export const signUp = async (email: string, password: string): Promise<void> => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    Alert.alert('Success', 'You are successfully registered!');
   
  } catch (error: any) {
    const message = getFirebaseErrorMessage(error.code as FirebaseErrorCode);
    Alert.alert('Signup Failed', message);
  }
};

// reset password 
export const passwordReset = async(email:string): Promise<void> => {
    try {
        await auth().sendPasswordResetEmail(email);
        Alert.alert('Password Reset', 'Check your email to reset your password.');
      } catch (error: any) {
        
        const message = getFirebaseErrorMessage(error.code as FirebaseErrorCode);
        Alert.alert('Password Reset Failed', message);
      }
}
