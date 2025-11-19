import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Screen } from "../../components/Screen";
import { useRouter } from "expo-router/build/exports";
import { useEffect, useState } from "react";
import { LoginForm } from "../../components/LoginForm";
import { VineyardList } from "../../components/VineyardList";

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <Screen>
        <StatusBar style="light" />
        <Text className="text-3xl font-bold text-white">
          Por favor inicia sesión
        </Text>
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      </Screen>
    );
  }
  return (
    <Screen>
      <StatusBar style="light" />
      <VineyardList />
    </Screen>
  );
}
