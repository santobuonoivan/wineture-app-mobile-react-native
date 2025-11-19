import "./global.css";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text className="text-green-500">
        Open up App.tsx to start working on your app!
      </Text>
      <Text>New Text Component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 1)000ff",
    alignItems: "center",
    justifyContent: "center",
  },
});
