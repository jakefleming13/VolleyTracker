import { useRef } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeView } from "../components/SafeView";
import { useRouter } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function forgotPassword() {
  const router = useRouter();

  const emailRef = useRef("");

  // Reset password
  const passwordReset = async () => {
    if (!emailRef.current) {
      Alert.alert("Error", "Please Fill in email.");
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert("Password Reset", "Check your email to reset your password.");
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);
      Alert.alert("Password Reset Failed", message);
    }
  };

  return (
    <SafeView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/VolleyTracker_logo.png")}
      />
      <Text style={styles.TitleText}>Forgot your password</Text>
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
      <TouchableOpacity style={styles.buttonContainer} onPress={passwordReset}>
        <View>
          <Text style={styles.btnText}>REQUEST RESET LINK</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Pressable onPress={() => router.push("signIn")}>
          <Text style={styles.toLoginText}>Back To Login</Text>
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
  TitleText: {
    fontSize: RFValue(20),
    color: "#26819E",
    marginBottom: 45,
  },
  inputContainer: {
    width: "70%",
    backgroundColor: "#A6CAD6",
    borderRadius: 25,
    height: 55,
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
    marginTop: 35,
    marginBottom: 35,
  },
  toLoginText: {
    fontSize: RFValue(13),
    color: "#26819E",
  },
  btnText: {
    fontSize: RFValue(10),
  },
});
