import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";

export function UserProfile() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que quieres cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Cerrar Sesión", style: "destructive", onPress: signOut },
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
          <Text className="text-white/80 ml-2 text-sm">Miembro desde hoy</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="location" size={16} color="#d41132" />
          <Text className="text-white/80 ml-2 text-sm">
            Ubicación no definida
          </Text>
        </View>
      </View>

      {/* Botón de logout */}
      <TouchableOpacity
        className="w-full h-12 bg-red-600 rounded-lg items-center justify-center flex-row active:bg-red-700"
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text className="text-white font-medium ml-2">Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
