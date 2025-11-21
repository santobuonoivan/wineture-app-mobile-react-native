import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Screen } from "../../components/Screen";
import { useRouter } from "expo-router/build/exports";
import { useEffect, useState } from "react";
import { LoginForm } from "../../components/LoginForm";
import { VineyardList } from "../../components/VineyardList";
import MapComponent from "../../components/MapComponent";

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
        <View className="flex-1 justify-center items-center space-y-6">
          <LoginForm onLogin={() => setIsLoggedIn(true)} />
        </View>
      </Screen>
    );
  }
  return (
    <Screen>
      <StatusBar style="light" />
      <MapComponent />
      <VineyardList />
    </Screen>
  );
}
