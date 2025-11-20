import "../global.css";
import { useEffect } from "react";
import { Link, Slot, Stack } from "expo-router";
import { Pressable, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { CircleInfoIcon } from "../components/Icons";
import { Logo } from "../components/Logo";

export default function Layout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Hide Android navigation bar
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
      // setBehaviorAsync removed - not compatible with edge-to-edge
    }
  }, []);

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" hidden={false} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerTitle: "",
          headerLeft: () => <Logo />,
          headerRight: () => (
            <Link asChild href="/about">
              <Pressable>
                <CircleInfoIcon />
                {/* se podria cambiar por el carrito de compras */}
              </Pressable>
            </Link>
          ),
        }}
      />
    </View>
  );
}
