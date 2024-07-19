import { StyleSheet, View, ActivityIndicator } from "react-native";
import { MenuProvider } from "react-native-popup-menu";

export default function StartPage() {
  return (
    <MenuProvider>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    </MenuProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
