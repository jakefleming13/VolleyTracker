import { Collapsible } from "@/components/Collapsible";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Collapsible title="Test">
        <Text>Test1</Text>
        <Text>Test2</Text>
        <Text>Test3</Text>
      </Collapsible>
    </View>
  );
}
