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
import { signUp } from "../services/authService";
import auth from "@react-native-firebase/auth";

export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password.");
      return;
    }
    signUp(email, password);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

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
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              textContentType="password"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setPassword}
              placeholder="Confirm Password"
              secureTextEntry={!isPasswordVisible}
              textContentType="password"
              style={styles.input}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Register" onPress={handleSignUp} />
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
