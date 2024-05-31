import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
// Custom error codes 
import { getFirebaseErrorMessage } from './firebaseErrorHandling';

// Sign in the user
export const signIn = async (email, password) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        const message = getFirebaseErrorMessage(error.code);
        Alert.alert('Login Failed', message);
    }
};

// Register new user
export const signUp = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    Alert.alert('Success', 'You are successfully registered!');
  } catch (error) {
    const message = getFirebaseErrorMessage(error.code);
    Alert.alert('Signup Failed', message);
  }
};

// Reset password
export const passwordReset = async (email) => {
    try {
        await auth().sendPasswordResetEmail(email);
        Alert.alert('Password Reset', 'Check your email to reset your password.');
    } catch (error) {
        const message = getFirebaseErrorMessage(error.code);
        Alert.alert('Password Reset Failed', message);
    }
}
