import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Screen } from "../../components/Screen";
import { useLanguage } from "../../hooks/useLanguage";
import { useAuth } from "../../hooks/useAuth";
import { getVisitsByUser } from "../../lib";
import { IVisit } from "../../interfaces";

interface Visit {
  id: number;
  visitId: string;
  vineyardName: string;
  vineyard: {
    uuid: string;
    img: string;
  };
  visitDate: string;
  status: string;
  tourName?: string;
  participants?: number;
}

export default function ReservationHistory() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [visits, setVisits] = useState<IVisit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadVisits();
    }
  }, [user?.id]);
  const mockUserId = 15; // For testing purposes

  const loadVisits = async () => {
    try {
      setLoading(true);
      const userId = parseInt(user!.id, 10) || 1;
      const response = await getVisitsByUser({ id: mockUserId });
      if (response.status === 200 && response.data) {
        const sortedVisits = response.data.sort((a: IVisit, b: IVisit) => {
          return (
            new Date(b.tour.day.date).getTime() -
            new Date(a.tour.day.date).getTime()
          );
        });
        setVisits(sortedVisits);
      }
    } catch (error) {
      console.error("Error loading visits:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <Ionicons name="checkmark-circle" size={16} color="#22c55e" />;
      case "confirmed":
        return (
          <MaterialIcons name="event-available" size={16} color="#3b82f6" />
        );
      case "pending":
        return <MaterialIcons name="event-note" size={16} color="#f97316" />;
      case "cancelled":
        return <Ionicons name="close-circle" size={16} color="#ef4444" />;
      default:
        return <Ionicons name="help-circle" size={16} color="#c6102e" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "#22c55e";
      case "CONFIRMED":
        return "#3b82f6";
      case "PENDING":
        return "#f97316";
      case "CANCELLED":
        return "#ef4444";
      default:
        return "#c6102e";
    }
  };

  const handleVisitPress = (visitId: number) => {
    router.push(`/reservation/${visitId}`);
  };

  const isPastVisit = (dateStr: string) => {
    return new Date(dateStr) < new Date();
  };

  return (
    <Screen>
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-[#67323b]/50">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold flex-1 text-center">
          {t("profile.reservationHistory")}
        </Text>
        <View className="w-10 h-10" />
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#d41132" />
        </View>
      ) : visits.length === 0 ? (
        <View className="flex-1 justify-center items-center p-6">
          <Ionicons name="calendar-outline" size={48} color="#c9929b" />
          <Text className="text-white text-lg font-semibold mt-4 text-center">
            {t("reservations.noReservations")}
          </Text>
          <Text className="text-[#c9929b] text-sm mt-2 text-center">
            {t("reservations.noReservationsDescription")}
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 p-4">
          <View className="gap-3 pb-6">
            {visits.map((visit) => (
              <TouchableOpacity
                key={visit.visitId}
                onPress={() => handleVisitPress(visit.visitId)}
                className="bg-[#482329] rounded-xl overflow-hidden active:opacity-70"
              >
                <View className="flex-row">
                  {/* Vineyard Image */}
                  <Image
                    source={{
                      uri:
                        visit.vineyard?.img || "https://via.placeholder.com/80",
                    }}
                    className="w-24 h-24"
                  />

                  {/* Visit Details */}
                  <View className="flex-1 p-4 justify-between">
                    <View className="gap-1">
                      <Text className="text-white text-base font-bold">
                        {visit.vineyard.vineyardName}
                      </Text>
                      <View className="flex-row items-center gap-2 mt-1">
                        <Ionicons name="calendar" size={14} color="#c9929b" />
                        <Text className="text-[#c9929b] text-xs">
                          {new Date(visit.tour.day.date).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </Text>
                      </View>
                    </View>

                    {/* Status Badge */}
                    <View className="flex-row items-center gap-2">
                      {getStatusIcon(visit.status)}
                      <Text
                        className="text-xs font-medium"
                        style={{ color: getStatusColor(visit.status) }}
                      >
                        {t(`statuses.${visit.status.toLowerCase()}`)}
                      </Text>
                      {isPastVisit(visit.tour.day.date) && (
                        <Text className="text-[#c9929b] text-xs ml-auto">
                          {t("statuses.completed")}
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* Arrow Icon */}
                  <View className="justify-center pr-4">
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#c9929b"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}
