import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";



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
    const register = async (email, password) => {
        try {
        await auth().createUserWithEmailAndPassword(email, password);
        Alert.alert('Success', 'You are successfully registered!');
        } catch (error) {
        const message = getFirebaseErrorMessage(error.code);
        Alert.alert('Signup Failed', message);
        }
    };


    // Reset password
    const passwordReset = async (email) => {
        try {
            await auth().sendPasswordResetEmail(email);
            Alert.alert('Password Reset', 'Check your email to reset your password.');
        } catch (error) {
            const message = getFirebaseErrorMessage(error.code);
            Alert.alert('Password Reset Failed', message);
        }
    }


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