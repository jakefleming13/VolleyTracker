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
import { useAuth } from '../context/authContext';

export default function SignUp(){
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const {register} = useAuth()
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const [isPasswordVisible, setPasswordVisible] = useState(false);



  const handleSignUp = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Error", "Please fill in both email and password.");
      return;
    }

    setLoading(true)

    await register(emailRef.current, passwordRef.current)
    setLoading(false)
   

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
          
          <View style = {styles.buttonContainer}>

            {
                loading? (
                    <View>
                        <Loading size = {hp(7)} />
                    </View>
                ): (
                    <Button title="Sign Up" onPress={handleSignUp} />
                )

            }
          </View>

          
          <View>
                <Text style = {{fontSize: hp(1.8)}}>Already have an account?</Text>

                <Pressable onPress = { () => router.push("signIn")}>
                <Text style = {{fontSize: hp(1.8), color: 'blue'}}>Sign In</Text>
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
