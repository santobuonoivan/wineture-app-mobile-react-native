import React from "react";
import { View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";

export function ProfileIcon() {
  const { user } = useAuth();

  return (
    <View className="w-8 h-8 rounded-full overflow-hidden bg-white/20 items-center justify-center">
      {user?.avatar ? (
        <Image
          source={{ uri: user.avatar }}
          className="w-full h-full"
          style={{ borderRadius: 16 }}
        />
      ) : (
        <Ionicons name="person" size={20} color="white" />
      )}
    </View>
  );
}
