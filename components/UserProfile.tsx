import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

export function UserProfile() {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    Alert.alert(t("auth.logout"), t("auth.logoutConfirm"), [
      { text: t("auth.cancel"), style: "cancel" },
      { text: t("auth.logout"), style: "destructive", onPress: signOut },
    ]);
  };

  if (!user) return null;

  return (
    <View className="bg-white/10 p-4 rounded-lg border border-white/20">
      {/* Header del usuario */}
      <View className="flex-row items-center mb-4">
        <View className="w-12 h-12 bg-[#d41132] rounded-full items-center justify-center mr-3">
          <Ionicons name="person" size={24} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-lg">
            {user.name || "Usuario"}
          </Text>
          <Text className="text-white/70 text-sm">{user.email}</Text>
        </View>
      </View>

      {/* Información adicional */}
      <View className="border-t border-white/10 pt-4 mb-4">
        <View className="flex-row items-center mb-2">
          <Ionicons name="wine" size={16} color="#d41132" />
          <Text className="text-white/80 ml-2 text-sm">
            {t("profile.memberSince")}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="location" size={16} color="#d41132" />
          <Text className="text-white/80 ml-2 text-sm">
            {t("profile.locationUndefined")}
          </Text>
        </View>
      </View>

      {/* Botón de logout */}
      <TouchableOpacity
        className="w-full h-12 bg-red-600 rounded-lg items-center justify-center flex-row active:bg-red-700"
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text className="text-white font-medium ml-2">{t("auth.logout")}</Text>
      </TouchableOpacity>
    </View>
  );
}
