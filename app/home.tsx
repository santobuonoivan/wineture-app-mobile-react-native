import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white gap-4 px-6">
      <StatusBar style="dark" />
      <Text className="text-3xl font-bold text-emerald-600">Home</Text>
      <Text className="text-base text-gray-700 text-center">
        Bienvenido a la pantalla principal. Aquí irá el contenido privado de tu
        app.
      </Text>
    </View>
  );
}
