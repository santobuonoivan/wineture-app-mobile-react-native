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
import { ProfileIcon } from "../components/ProfileIcon";
import { useAuth } from "../hooks/useAuth";
import { LoginFormV2 } from "../components/LoginFormV2";
// Importar configuración de i18n
import "../config/i18n";

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
    <View className="flex-1 bg-[#221013] p-2">
      <StatusBar style="light" hidden={false} />
      {isAuthenticated ? (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#221013" },
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
              <View className="flex-row">
                <Link asChild href="/cart">
                  <Pressable className="relative p-3">
                    <CartBadge count={5} />
                    <CartIcon />
                    {/* se podria cambiar por el carrito de compras */}
                  </Pressable>
                </Link>
                <Link asChild href="/profile">
                  <Pressable className="relative p-3">
                    <ProfileIcon />
                    {/* se podria cambiar por el carrito de compras */}
                  </Pressable>
                </Link>
              </View>
            ),
          }}
        />
      ) : (
        <LoginFormV2 />
      )}
    </View>
  );
}
