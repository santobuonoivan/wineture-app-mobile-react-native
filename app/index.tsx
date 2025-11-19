import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white gap-4">
      <StatusBar style="light" />
      <Text className="text-2xl font-semibold text-green-400">
        Open up App.tsx para empezar a construir
      </Text>
      <Text className="text-base text-white">New Text Component3</Text>
    </View>
  );
}
