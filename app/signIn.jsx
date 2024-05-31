import {Pressable, Text } from 'react-native'
import React from 'react'
import { useRef } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useState } from "react";
import Loading from '../components/Loading'
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
  TouchableOpacity,
} from "react-native";
import { SafeView } from "../components/SafeView";

import { useRouter } from 'expo-router';
import {useAuth} from '../context/authContext'

export default function SignIn(){
  const router = useRouter()
  // All auth related events should come from custom hook
  const {login} = useAuth()
  const [loading, setLoading] = useState(false)

// useRef instead of useState because everryime state changes in useState, whole component re-renders
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Error", "Please fill in both email and password.");
      return;
    }
    await login(emailRef.current, passwordRef.current)
  };

 
  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    passwordReset(emailRef.current);
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
              onChangeText={value => emailRef.current = value}
              placeholder="Email"
              textContentType="emailAddress"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={value => passwordRef.current = value}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              textContentType="password"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconContainer}
            >
              <Image
                style={styles.icon}
                source={
                  isPasswordVisible
                    ? require("../assets/icons/hide-password.png")
                    : require("../assets/icons/show-password.png")
                }
              />
            </TouchableOpacity>
          </View>
          
        
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} />
            <View>

            {
                loading? (
                    <View>
                        <Loading size = {hp(7)} />
                    </View>
                ): (
                    <Button title="Login" onPress={handleLogin} />
                )


            }
            </View>

            <View>

            <Button title="Reset Password" onPress={handlePasswordReset} />

            </View>

            </View>


            <View>
                <Text style = {{fontSize: hp(1.8)}}>Don't have an account?</Text>

                <Pressable onPress = { () => router.push("signUp")}>
                <Text style = {{fontSize: hp(1.8), color: 'blue'}}>Sign Up</Text>
                </Pressable>
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
  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
});
