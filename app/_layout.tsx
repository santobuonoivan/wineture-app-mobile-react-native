import "../global.css";
import { useEffect } from "react";
import { Link, Stack } from "expo-router";
import { Pressable, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { CartIcon } from "../components/Icons";
import { Logo } from "../components/Logo";
import { CartBadge } from "../components/cart/CartBadge";
import { useAuth } from "../hooks/useAuth";
import { LoginFormV2 } from "../components/LoginFormV2";

export default function Layout() {
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    // Hide Android navigation bar
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
      // setBehaviorAsync removed - not compatible with edge-to-edge
    }
  }, []);

  return (
    <View className="flex-1 bg-black p-2 rounded-lg">
      <StatusBar style="light" hidden={false} />
      {isAuthenticated ? (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerTitle: "",
            headerLeft: () => (
              <Link asChild href="/about">
                <Pressable className="p-4">
                  <Logo />
                </Pressable>
              </Link>
            ),
            headerRight: () => (
              <Link asChild href="/cart">
                <Pressable className="relative p-3">
                  <CartBadge count={5} />
                  <CartIcon />
                  {/* se podria cambiar por el carrito de compras */}
                </Pressable>
              </Link>
            ),
          }}
        />
      ) : (
        <LoginFormV2 />
      )}
    </View>
  );
}
