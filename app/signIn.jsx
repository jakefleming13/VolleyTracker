import { Pressable, Text } from "react-native";
import React from "react";
import { useRef } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useState } from "react";
import Loading from "../components/Loading";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeView } from "../components/SafeView";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
import { RFValue } from "react-native-responsive-fontsize";

export default function SignIn() {
  const router = useRouter();
  // All auth related events should come from custom hook
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // useRef instead of useState because everryime state changes in useState, whole component re-renders
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Error", "Please fill in both email and password.");
      return;
    }
    setLoading(true);
    await login(emailRef.current, passwordRef.current);
    setLoading(false);
  };

  return (
    <SafeView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/VolleyTracker_logo.png")}
      />
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(value) => (emailRef.current = value)}
          placeholder="Email..."
          textContentType="emailAddress"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => (passwordRef.current = value)}
          placeholder="Password..."
          secureTextEntry={!isPasswordVisible}
          textContentType="password"
          style={styles.input}
        />
      </View>
      <View>
        <Pressable onPress={() => router.push("forgotPassword")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <View>
          {loading ? (
            <View>
              <Loading size={hp(7)} />
            </View>
          ) : (
            <Text style={styles.loginText}>LOGIN</Text>
          )}
        </View>
      </TouchableOpacity>

      <View>
        <Pressable onPress={() => router.push("signUp")}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: wp(30),
    height: hp(30),
    marginBottom: 70,
  },
  inputContainer: {
    width: "70%",
    backgroundColor: "#A6CAD6",
    borderRadius: 25,
    height: 55,
    marginBottom: 20,
    justifyContent: "center",
    padding: 15,
  },
  input: {
    fontSize: RFValue(10),
  },
  buttonContainer: {
    width: "70%",
    backgroundColor: "#26819E",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 15,
  },
  signUpText: {
    fontSize: RFValue(15),
    color: "#26819E",
  },
  forgotText: {
    fontSize: RFValue(10),
    color: "#26819E",
  },
  loginText: {
    fontSize: RFValue(10),
  },
});
