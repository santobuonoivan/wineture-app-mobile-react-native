import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text className="text-green-500">
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
      <Text>New Text Component3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
