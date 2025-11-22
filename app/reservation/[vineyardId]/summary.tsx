import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../../components/Screen";
import { Ionicons } from "@expo/vector-icons";

export default function ReservationSummaryScreen() {
  const { vineyardId, success } = useLocalSearchParams<{
    vineyardId: string;
    success?: string;
  }>();
  const router = useRouter();

  // En producción, estos datos vendrían de la API o del estado global
  const reservationDetails = {
    referenceNumber: "V-1A2B3C4D",
    dateTime: "25 Oct, 2024 a las 11:00 AM",
    tour: "Cata de Vinos Premium",
    people: "2",
    totalPaid: "€90.00",
  };

  return (
    <Screen>
      <ScrollView className="flex-1">
        <View className="flex-1 items-center justify-center p-4 pt-16">
          {/* Success Icon */}
          <View className="items-center justify-center h-20 w-20 bg-[#800020]/20 rounded-full mb-6">
            <Ionicons name="checkmark" size={48} color="#800020" />
          </View>

          {/* Headline and Body Text */}
          <Text className="text-white text-[32px] font-bold leading-tight text-center pb-2">
            ¡Todo listo!
          </Text>
          <Text className="text-zinc-300 text-base font-normal leading-normal pb-8 px-4 text-center max-w-sm">
            Hemos recibido tu reserva con éxito.
          </Text>

          {/* Details Card */}
          <View className="w-full max-w-md bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
            <Text className="text-white text-lg font-bold leading-tight pb-4">
              Detalles de la Reserva
            </Text>

            <View className="space-y-3">
              {/* Nº de Referencia */}
              <View className="flex-row justify-between gap-6 py-1">
                <Text className="text-zinc-400 text-sm font-normal leading-normal">
                  Nº de Referencia
                </Text>
                <Text className="text-white text-sm font-medium leading-normal text-right">
                  {reservationDetails.referenceNumber}
                </Text>
              </View>

              {/* Fecha y Hora */}
              <View className="flex-row justify-between gap-6 py-1">
                <Text className="text-zinc-400 text-sm font-normal leading-normal">
                  Fecha y Hora
                </Text>
                <Text className="text-white text-sm font-medium leading-normal text-right">
                  {reservationDetails.dateTime}
                </Text>
              </View>

              {/* Tour */}
              <View className="flex-row justify-between gap-6 py-1">
                <Text className="text-zinc-400 text-sm font-normal leading-normal">
                  Tour
                </Text>
                <Text className="text-white text-sm font-medium leading-normal text-right">
                  {reservationDetails.tour}
                </Text>
              </View>

              {/* Personas */}
              <View className="flex-row justify-between gap-6 py-1">
                <Text className="text-zinc-400 text-sm font-normal leading-normal">
                  Personas
                </Text>
                <Text className="text-white text-sm font-medium leading-normal text-right">
                  {reservationDetails.people}
                </Text>
              </View>

              {/* Divider */}
              <View className="w-full border-t border-dashed border-zinc-700 my-3" />

              {/* Total Pagado */}
              <View className="flex-row justify-between gap-6 py-1">
                <Text className="text-zinc-400 text-sm font-normal leading-normal">
                  Total Pagado
                </Text>
                <Text className="text-white text-sm font-bold leading-normal text-right">
                  {reservationDetails.totalPaid}
                </Text>
              </View>
            </View>
          </View>

          {/* Follow-up Message */}
          <Text className="text-zinc-400 text-sm font-normal leading-normal pt-8 px-4 text-center max-w-sm">
            Recibirás un correo electrónico de confirmación con todos los
            detalles.
          </Text>
        </View>
      </ScrollView>

      {/* Action Buttons Footer */}
      <View className="p-4 pt-6">
        <View className="flex flex-col gap-4">
          <TouchableOpacity
            className="w-full h-12 px-6 bg-[#800020] rounded-lg items-center justify-center"
            onPress={() => router.push("/reservations")}
          >
            <Text className="text-white text-base font-bold leading-normal">
              Ir a Mis Reservas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full h-12 px-6 bg-transparent rounded-lg items-center justify-center"
            onPress={() => router.push("/")}
          >
            <Text className="text-white text-base font-medium leading-normal">
              Volver al Inicio
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}
