import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, ViewStyle } from "react-native";


export function SafeView({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
  },
});
