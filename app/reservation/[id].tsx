import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { useLanguage } from "../../hooks/useLanguage";
import { getVisitById } from "../../lib";

interface IReservationDetail {
  vineyardName: string;
  visitDate: string;
  visitTime: string;
  peopleCount: number;
  specialInstructions?: string;
  status: string;
}

export default function ReservationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: any }>();
  const { t } = useLanguage();

  const [reservation, setReservation] = useState<IReservationDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const resp = await getVisitById({ id });

        if (!active) return;

        if (resp.status === 200 && resp.data) {
          const data = resp.data;

          const visitDate = data.tour?.tourTime
            ? data.tour?.tourTime.substring(0, 5)
            : "--:--";

          const formatted: IReservationDetail = {
            vineyardName: data.vineyard?.vineyardName || "",
            visitDate: data.tour?.dayId
              ? `Día #${data.tour.dayId}`
              : t("common.notAvailable"),
            visitTime: visitDate,
            peopleCount: (data.people?.length || 0) + 1,
            specialInstructions: "",
            status: (data.status || "").toLowerCase(),
          };

          setReservation(formatted);
        }
      } catch (err) {
        console.log("Error fetching reservation: ", err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#c6102e" />
        </View>
      </Screen>
    );
  }

  if (!reservation) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">{t("common.notFound")}</Text>
        </View>
      </Screen>
    );
  }

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
                {reservation.visitDate}
              </Text>
            </View>

            <View className="flex-col gap-1">
              <Text className="text-[#c9929b] text-sm">
                {t("reservationDetails.time")}
              </Text>
              <Text className="text-white text-base font-medium">
                {reservation.visitTime}
              </Text>
            </View>

            <View className="flex-col gap-1">
              <Text className="text-[#c9929b] text-sm">
                {t("reservationDetails.people")}
              </Text>
              <Text className="text-white text-base font-medium">
                {reservation.peopleCount} {t("reservationDetails.peopleSuffix")}
              </Text>
            </View>
          </View>
        </View>

        {/* Estado */}
        <View className="mt-6 flex flex-col gap-3 rounded-xl bg-[#c6102e]/15 p-4">
          <Text className="text-white text-base font-bold">
            {t("reservationDetails.statusTitle")}
          </Text>

          <Text className="text-[#c9929b] text-sm">
            {t(`statuses.${reservation.status}`)}
          </Text>
        </View>

        {/* Instrucciones especiales */}
        {reservation.specialInstructions ? (
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
        ) : null}
      </ScrollView>

      {/* Footer */}
      <View className="px-4 py-6 border-t border-[#67323b]">
        <TouchableOpacity className="w-full h-12 bg-[#c6102e] rounded-lg items-center justify-center flex-row gap-2 mb-3">
          <Ionicons name="calendar-outline" size={20} color="#fff" />
          <Text className="text-white font-bold">
            {t("reservationDetails.addToCalendar")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-full h-12 items-center justify-center">
          <Text className="text-[#c6102e] font-bold">
            {t("reservationDetails.cancelReservation")}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
