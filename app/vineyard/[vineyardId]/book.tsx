import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { VisitBookingForm } from "../../../components/vineyard/VisitBookingForm";

export default function VineyardBookingScreen() {
  const { vineyardId } = useLocalSearchParams<{ vineyardId: string }>();
  const router = useRouter();

  return (
    <Screen>
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pb-2">
        <TouchableOpacity
          className="w-12 h-12 items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold flex-1 text-center">
          Reservar Visita
        </Text>
        <View className="w-12 h-12" />
      </View>

      <ScrollView className="flex-1 px-4 pb-8">
        <Text className="text-white text-base mb-4">
          Completa el formulario para agendar tu visita al viñedo.
        </Text>

        {/* Usa el formulario existente, pasando el vineyard_uuid si es necesario */}
        <VisitBookingForm
          vineyardId={!isNaN(Number(vineyardId)) ? Number(vineyardId) : 0}
        />
      </ScrollView>
    </Screen>
  );
}
