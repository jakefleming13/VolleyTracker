import { Pressable, Text } from "react-native";
import React from "react";
import { useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import Loading from "../components/Loading";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeView } from "../components/SafeView";
import { RFValue } from "react-native-responsive-fontsize";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";

export default function SignUp() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const coachNameRef = useRef("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    if (!emailRef.current || !passwordRef.current || !coachNameRef.current) {
      Alert.alert("Error", "Please fill in both email and password.");
      return;
    }

    setLoading(true);

    await register(emailRef.current, passwordRef.current, coachNameRef.current);
    setLoading(false);
  };

  return (
    <SafeView style={styles.container}>
      <Text style={styles.TitleText}>Create new account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(value) => (emailRef.current = value)}
          placeholder="Email..."
          textContentType="emailAddress..."
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

      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(value) => (coachNameRef.current = value)}
          placeholder="Name..."
          textContentType="none"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
        <View>
          {loading ? (
            <View>
              <Loading size={hp(7)} />
            </View>
          ) : (
            <Text style={styles.btnText}>SIGN UP</Text>
          )}
        </View>
      </TouchableOpacity>

      <View>
        <Pressable
          onPress={() => router.push("signIn")}
          style={styles.signInText}
        >
          <Text style={styles.AlreadyAccountText}>
            Already have an account?
          </Text>
          <Text style={styles.signInText}>Sign In</Text>
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
  TitleText: {
    fontSize: RFValue(25),
    color: "#26819E",
    marginBottom: 40,
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
  signInText: {
    fontSize: RFValue(11),
    color: "#26819E",
    alignSelf: "center",
  },
  btnText: {
    fontSize: RFValue(10),
  },
  AlreadyAccountText: {
    fontSize: RFValue(8),
  },
});
