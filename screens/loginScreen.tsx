import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeView } from '../components/SafeView';

// bring in sign in and signup functionality from services folder
import { signIn, signUp } from '../services/authService';
import auth from '@react-native-firebase/auth';

export function LoginScreen(): JSX.Element {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }
    signIn(email, password);
  };

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }
    signUp(email, password);
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password Reset', 'Check your email to reset your password.');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'There was an error sending the password reset email.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <SafeView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/images/react-logo.png')}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            textContentType="emailAddress"
            style={[styles.input, styles.pad]}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            textContentType="password"
            style={[styles.input, styles.pad]}
          />
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} />
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Reset Password" onPress={handlePasswordReset} />
          </View>
          <Button title={isPasswordVisible ? "Hide Password" : "Show Password"} onPress={togglePasswordVisibility} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  pad: {
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
});

