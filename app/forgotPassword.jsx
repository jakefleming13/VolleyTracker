import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeView } from "../components/SafeView";




export default function forgotPassword() {
  const [email, setEmail] = useState("");

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


  return (
    <SafeView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/react-logo.png")}
          />
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Email"
              textContentType="emailAddress"
              style={styles.input}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Reset Password" onPress={passwordReset} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "80%",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
});
