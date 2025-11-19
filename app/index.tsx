import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { LoginForm } from "../components/LoginForm";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home");
    }
  }, [isLoggedIn, router]);

  return (
    <View className="flex-1 w-full max-w-md items-center justify-center bg-black px-6 gap-6">
      <StatusBar style="light" />
      <Text className="text-3xl font-bold text-white self-start">
        Bienvenido nuevamente
      </Text>
      <Text className="text-base text-white/70 self-start">
        Inicia sesión para continuar
      </Text>
      <LoginForm onLogin={() => setIsLoggedIn(true)} />
    </View>
  );
}
