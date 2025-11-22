import "../global.css";
import { useEffect } from "react";
import { Link, Stack } from "expo-router";
import { Pressable, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { CartIcon, MenuIconUnfold } from "../components/Icons";
import { Logo } from "../components/Logo";
import { CartBadge } from "../components/cart/CartBadge";
import { ProfileIcon } from "../components/ProfileIcon";
import { useAuth } from "../hooks/useAuth";
import { LoginFormV2 } from "../components/LoginFormV2";
// Importar configuración de i18n
import "../config/i18n";
import { LateralMenu } from "../components/ui/LateralMenu";
import { useMenuStore } from "../store/useMenuStore";

export default function Layout() {
  const insets = useSafeAreaInsets();
  const { isOpen, toggle, close } = useMenuStore();

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
      {/* Drawer lateral */}
      <LateralMenu visible={isOpen} onClose={close} />
      {isAuthenticated ? (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#221013" },
            headerTintColor: "white",
            headerTitle: "",
            headerLeft: () => (
              <View className="flex-row">
                <View className="pt-4">
                  <Pressable className="relative p-3" onPress={toggle}>
                    <MenuIconUnfold />
                  </Pressable>
                </View>
                <Link asChild href="/">
                  <Pressable className="p-3">
                    <Logo />
                  </Pressable>
                </Link>
              </View>
            ),
            headerRight: () => (
              <View className="flex-row">
                <View className="pt-2">
                  <Link asChild href="/cart">
                    <Pressable className="relative p-3">
                      <CartBadge count={5} />
                      <CartIcon />
                      {/* se podria cambiar por el carrito de compras */}
                    </Pressable>
                  </Link>
                </View>
                <View className="pt-1">
                  <Link asChild href="/profile">
                    <Pressable className="relative p-3">
                      <ProfileIcon />
                      {/* se podria cambiar por el carrito de compras */}
                    </Pressable>
                  </Link>
                </View>
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
