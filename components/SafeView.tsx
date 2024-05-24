import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, ViewStyle } from "react-native";

interface Props {
  children: any;
  style: ViewStyle | ViewStyle[];
}

export function SafeView({ children, style }: Props) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
  },
});
