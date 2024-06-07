import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { getFirebaseErrorMessage } from "../services/firebaseErrorHandling";
import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const onAuthStateChanged = async (newUser) => {
    setLoading(true);
    if (newUser) {
      await updateUserData(newUser.uid);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  const updateUserData = async (userID) => {
    try {
      const doc = await firestore().collection("users").doc(userID).get();
      if (doc.exists) {
        const firestoreData = doc.data();
        setUser((prevUser) => ({
          ...prevUser,
          ...firestoreData, // Merge Firestore data with existing auth data
        }));
      } else {
        console.log("No additional user data found in Firestore.");
      }
    } catch (error) {
      console.error("Failed to fetch user data from Firestore:", error);
    }
  };

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);
      Alert.alert("Login Failed", message);
    }
  };

  // Register new user
  const register = async (email, password, coachName) => {
    try {
      // add user to auth
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const userID = userCredential.user.uid;

      // Create document for user profile
      await firestore()
        .collection("users")
        .doc(userID) // set collection ID to user ID
        .set({
          userID: userID,
          coachName: coachName,
          //teamName: teamName
        });

      await updateUserData(userID);
      Alert.alert("Success", "You are successfully registered!");
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);

      Alert.alert("Signup Failed", message);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);
      Alert.alert("Login Failed", message);
    }
  };

  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside an auth context provider");
  }

  return value;
};
