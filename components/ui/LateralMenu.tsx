import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MenuIconFold } from "../Icons";
import { useAuth } from "../../hooks/useAuth";
import { useCartStore } from "../../store/useCartStore";
import { useLanguage } from "../../hooks/useLanguage";

type LateralMenuProps = {
  visible: boolean;
  onClose: () => void;
};

export function LateralMenu({ visible, onClose }: LateralMenuProps) {
  const { user, signOut, isAuthenticated } = useAuth();
  const cartCount = useCartStore((s) => s.items.length);
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogout = async () => {
    await signOut();
    onClose();
    router.replace("/");
  };

  const nav = (path: string) => {
    onClose();
    router.push(path);
  };

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-30">
      {/* Overlay */}
      <Pressable className="absolute inset-0 bg-black/50" onPress={onClose} />

      {/* Drawer */}
      <View className="pt-7 absolute inset-y-0 left-0 w-4/5 max-w-[340px] bg-[#330309] shadow-2xl">
        {/* Header */}
        <View className="flex-row items-center px-4 pt-6 pb-4 border-b border-white/10">
          <Pressable className="mr-3" onPress={onClose}>
            <MenuIconFold />
          </Pressable>
          <View className="flex-1 flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full overflow-hidden bg-[#000] items-center justify-center">
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  className="w-full h-full"
                />
              ) : (
                <Ionicons name="person" size={28} color="#c6102e" />
              )}
            </View>
            <View>
              <Text className="text-white font-bold">
                {user?.name ?? t("menu.guest")}
              </Text>
              <Text className="text-[#c9929b] text-xs">
                {user?.email ?? ""}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 justify-between p-4">
          <View className="flex-col gap-1">
            <DrawerItem
              label={t("menu.home")}
              icon="home"
              onPress={() => nav("/")}
            />
            <DrawerItem
              label={t("menu.vineyards")}
              icon="map"
              onPress={() => nav("/vineyard")}
            />
            <DrawerItem
              label={t("menu.wines")}
              icon="wine"
              onPress={() => nav("/wines")}
            />

            {isAuthenticated && (
              <>
                <DrawerItem
                  label={t("menu.reservations")}
                  icon="calendar"
                  onPress={() => nav("/reservation/history")}
                />
                <DrawerItem
                  label={t("menu.orders")}
                  icon="list"
                  onPress={() => nav("/order/history")}
                />
                <DrawerItem
                  label={t("menu.cart")}
                  icon="cart"
                  badge={cartCount}
                  onPress={() => nav("/cart")}
                />
                <DrawerItem
                  label={t("menu.profile")}
                  icon="person"
                  onPress={() => nav("/profile")}
                />
              </>
            )}

            <DrawerItem
              label={t("menu.help")}
              icon="help-circle"
              onPress={() => nav("/about")}
            />
            <DrawerItem
              label={t("menu.settings")}
              icon="settings"
              onPress={() => nav("/profile/settings")}
            />
          </View>

          <View className="border-t border-white/10 pt-4">
            {isAuthenticated ? (
              <DrawerItem
                label={t("menu.logout")}
                icon="log-out"
                onPress={handleLogout}
              />
            ) : (
              <DrawerItem
                label={t("menu.login")}
                icon="log-in"
                onPress={() => nav("/")}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

type DrawerItemProps = {
  label: string;
  icon?: string;
  badge?: number;
  active?: boolean;
  onPress?: () => void | Promise<void>;
};

function DrawerItem({ label, icon, badge, active, onPress }: DrawerItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center gap-3 rounded-lg px-3 py-3 ${active ? "bg-[#d41132]/20" : ""}`}
    >
      <View className="w-8 items-center">
        <Ionicons name={icon as any} size={20} color="#c9929b" />
      </View>
      <Text
        className={`font-medium ${active ? "text-white" : "text-gray-200"}`}
      >
        {label}
      </Text>
      {badge && badge > 0 && (
        <View className="ml-auto bg-[#c6102e] px-2 py-0.5 rounded-full">
          <Text className="text-white text-xs">{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
