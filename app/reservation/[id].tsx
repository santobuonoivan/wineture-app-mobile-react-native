import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { useLanguage } from "../../hooks/useLanguage";

export default function ReservationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();

  // Datos de ejemplo, en el futuro se puede buscar la reserva real por id
  const reservation = {
    id,
    vineyardName: "Viñedo del Sol",
    dateLabel: "Sábado, 25 Nov",
    timeLabel: "11:00 AM",
    peopleLabel: "2 Adultos",
    specialInstructions:
      "Alergia a las nueces. Por favor, tenerlo en cuenta durante la cata de vinos y el maridaje.",
  };

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
          {t("reservationDetails.title")}
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 pt-4 pb-8">
        {/* Card principal */}
        <View className="flex flex-col gap-4 rounded-xl bg-[#482329] p-4">
          <View className="flex-row items-center gap-4">
            <View className="rounded-lg bg-[#c6102e]/30 w-16 h-16 items-center justify-center">
              <Ionicons name="wine" size={28} color="#fff" />
            </View>
            <View className="flex-col">
              <Text className="text-[#c9929b] text-sm">
                {t("reservationDetails.visitLabel")}
              </Text>
              <Text className="text-white text-lg font-bold">
                {reservation.vineyardName}
              </Text>
            </View>
          </View>

          <View className="h-px w-full bg-[#67323b]" />

          <View className="flex-row justify-between">
            <View className="flex-col gap-1">
              <Text className="text-[#c9929b] text-sm">
                {t("reservationDetails.date")}
              </Text>
              <Text className="text-white text-base font-medium">
                {reservation.dateLabel}
              </Text>
            </View>
            <View className="flex-col gap-1">
              <Text className="text-[#c9929b] text-sm">
                {t("reservationDetails.time")}
              </Text>
              <Text className="text-white text-base font-medium">
                {reservation.timeLabel}
              </Text>
            </View>
            <View className="flex-col gap-1">
              <Text className="text-[#c9929b] text-sm">
                {t("reservationDetails.people")}
              </Text>
              <Text className="text-white text-base font-medium">
                {reservation.peopleLabel}
              </Text>
            </View>
          </View>
        </View>

        {/* Estado de la reserva */}
        <View className="mt-6 flex flex-col gap-3 rounded-xl bg-[#c6102e]/15 p-4">
          <Text className="text-white text-base font-bold">
            {t("reservationDetails.statusTitle")}
          </Text>
          <Text className="text-[#c9929b] text-sm">
            {t("reservationDetails.statusDescription")}
          </Text>
        </View>

        {/* Instrucciones especiales */}
        <View className="mt-6">
          <Text className="text-white text-base font-bold mb-3">
            {t("reservationDetails.specialInstructionsTitle")}
          </Text>
          <View className="rounded-xl bg-[#482329] p-4">
            <Text className="text-[#c9929b] text-sm">
              {reservation.specialInstructions}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer botones */}
      <View className="px-4 py-6 border-t border-[#67323b]">
        <TouchableOpacity className="w-full h-12 bg-[#c6102e] rounded-lg items-center justify-center flex-row gap-2 mb-3">
          <Ionicons name="calendar-outline" size={20} color="#fff" />
          <Text className="text-white font-bold">
            {t("reservationDetails.addToCalendar")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-full h-12 bg-transparent rounded-lg items-center justify-center">
          <Text className="text-[#c6102e] font-bold">
            {t("reservationDetails.cancelReservation")}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
