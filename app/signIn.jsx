import { Pressable, Text, ScrollView } from "react-native";
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
import { Dimensions } from "react-native";
import { COLORS } from "../constants/Colors";

export default function SignIn() {
  const router = useRouter();
  // All auth related events should come from custom hook
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // useRef instead of useState because everryime state changes in useState, whole component re-renders
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const tabletLogo = require("../assets/images/VolleyTracker_logo.png");
  const phoneLogo = require("../assets/icons/VolleyTracker_icon.png");
  const loginLogo =
    windowWidth < 500 || windowHeight < 500 ? phoneLogo : tabletLogo;

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
      {/* TODO: get Scrolling working for phones, tablet works great */}
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
      <Image style={styles.logo} source={loginLogo} resizeMode="contain" />
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(value) => (emailRef.current = value)}
          placeholder="Email..."
          textContentType="emailAddress"
          style={styles.input}
          maxLength={30}
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
          maxLength={30}
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
      {/* </ScrollView> */}
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
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: wp(40),
    height: hp(30),
    marginBottom: 40,
  },
  inputContainer: {
    width: "70%",
    backgroundColor: COLORS.secondary,
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
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 15,
  },
  signUpText: {
    fontSize: RFValue(15),
    color: COLORS.primary,
  },
  forgotText: {
    fontSize: RFValue(10),
    color: COLORS.primary,
  },
  loginText: {
    fontSize: RFValue(10),
  },
});
