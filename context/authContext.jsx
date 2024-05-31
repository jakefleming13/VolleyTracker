import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { getFirebaseErrorMessage } from "../services/firebaseErrorHandling";
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [initializing, setInitializing] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

        // Handle user state changes
    function onAuthStateChanged(newUser) {
        setUser(newUser);
        setIsAuthenticated(!!newUser)
        if (initializing) setInitializing(false);
    }


     useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return subscriber
  }, []);

    const login = async (email, password) => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            const message = getFirebaseErrorMessage(error.code);
            Alert.alert('Login Failed', message);
        }
    };

    // Register new user
    const register = async (email, password, coachName, teamName) => {
        try {
        // add user to auth
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const userID = userCredential.user.uid

        // Create document for user profile 
        await firestore()
        .collection('users')
        .doc(userID) // set collection ID to user ID
        .set({
            userID: userID,
            coachName: coachName,
            teamName: teamName
          
        });
        Alert.alert('Success', 'You are successfully registered!');
        } catch (error) {
        const message = getFirebaseErrorMessage(error.code);
        
        Alert.alert('Signup Failed', message);
        }

        
    };


   


    const logout = async () => {
        try {
            await auth().signOut()
        } catch (error) {
            const message = getFirebaseErrorMessage(error.code);
            Alert.alert('Login Failed', message);
        }
    };

    if (initializing) return null

    return (
        <AuthContext.Provider value = {{user, isAuthenticated, login, register ,logout}}>
            {children}
        </AuthContext.Provider>
    )


}



export const useAuth = () => {
    const value = useContext(AuthContext)

    if (!value) {
        throw new Error('useAuth must be wrapped inside an auth context provider')
    }

    return value
}