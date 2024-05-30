import { Image, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { SafeView } from "@/components/SafeView";

export function LoginScreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    //Custom SafeAreaView component
    <SafeView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/react-logo.png")}
      />
      <TextInput //Email Field:
        autoCapitalize="none"
        autoCorrect={false}
        // icon="email"
        //Makes it easier to type an email address:
        keyboardType="email-address"
        onChangeText={(text: any) => setEmail(text)}
        placeholder="Email"
        //Only works on IOS:
        textContentType="emailAddress"
        style={styles.pad}
      />
      <TextInput //Password Field:
        autoCapitalize="none"
        autoCorrect={false}
        // icon="lock"
        onChangeText={(text: any) => setPassword(text)}
        placeholder="Password"
        //Only works on IOS:
        secureTextEntry={true}
        textContentType="password"
        style={styles.pad}
      />
      <Button title="Login" onPress={() => console.log(email, password)} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: "10%",
  },

  //centers the Logo
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  pad: {
    marginBottom: 20,
  },
});
