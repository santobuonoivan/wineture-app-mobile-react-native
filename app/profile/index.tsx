import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import { router } from "expo-router";
import { LanguageSelector } from "../../components/LanguageSelector";
import { Screen } from "../../components/Screen";

import { getOrdersByUser, getVisitsByUser } from "../../lib";
import { IOrderSummary, IVisit } from "../../interfaces";
interface IMappedOrder {
  id: number;
  uuid: string;
  number: string;
  date: string;
  amount: string;
  status: string;
}

interface IMappedReservation {
  id: number;
  uuid: string;
  date: string;
  vineyard: string;
  status: string;
}

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<"orders" | "reservations">(
    "orders"
  );

  const [orders, setOrders] = useState<IMappedOrder[]>([]);
  const [reservations, setReservations] = useState<IMappedReservation[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MOCK_USER_ID = 15;

  // ---------------- FETCH FUNCTION ----------------
  const loadData = useCallback(async () => {
    setError(null);
    try {
      setLoading(true);

      // -------- ORDERS --------
      const ordRes = await getOrdersByUser({ id: MOCK_USER_ID });

      const rawOrders = ordRes.data;
      const mappedOrders = rawOrders.map((order: IOrderSummary) => ({
        id: order.orderId,
        uuid: order.uuid,
        number: order.uuid.slice(0, 8).toUpperCase(),
        date: new Date(order.orderDate).toLocaleDateString(),
        amount: `$${order.totalAmount}`,
        status: order.status.statusName.toLowerCase(),
      }));

      setOrders(mappedOrders);

      // -------- VISITS --------
      const visRes = await getVisitsByUser({ id: MOCK_USER_ID });
      const rawVisits = visRes?.data ?? [];

      const mappedVisits = rawVisits.map((visit: IVisit) => {
        const visitDate = visit.tour.day.date;
        const visitTourTime = visit.tour.tourTime;
        const dateTimeString = `${visitDate}T${visitTourTime}`;

        // Crear fecha en UTC y convertir a hora local del cliente
        const utcDate = new Date(dateTimeString + "Z"); // La 'Z' indica UTC
        const dateFormated =
          utcDate.toLocaleDateString() +
          " - " +
          utcDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
        return {
          id: visit.visitId,
          uuid: visit.uuid,
          date: dateFormated,
          vineyard: visit.vineyard.vineyardName,
          status: visit.status.toLowerCase(),
        };
      });
      setReservations(mappedVisits);
    } catch (e) {
      console.log("Profile Load Error:", e);
      setError("Error loading data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleEditProfile = () => router.push("/profile/edit");
  const handleLogout = () => {
    signOut();
    router.replace("/");
  };

  const handleViewMore = () => {
    router.push(
      activeTab === "orders"
        ? "/profile/orders/history"
        : "/profile/reservations/history"
    );
  };

  // ---------------- RENDER ITEMS ----------------
  const renderOrderItem = (order: IMappedOrder) => (
    <TouchableOpacity
      key={order.id}
      className="flex-row items-center justify-between bg-transparent min-h-[72px] py-2 pr-2"
      onPress={() => router.push(`/order/${order.uuid}`)}
    >
      <View className="flex-row items-center gap-4 flex-1">
        <View className="w-12 h-12 rounded-lg bg-[#c6102e]/10 items-center justify-center">
          <Ionicons name="cube-outline" size={24} color="#c6102e" />
        </View>

        <View className="flex-1">
          <Text className="text-white text-base font-medium">
            {t("profile.orderNumber", { number: order.number })}
          </Text>
          <Text className="text-[#c9929b] text-sm">
            {order.date} - {order.amount}
          </Text>
        </View>
      </View>

      <Text className="text-white text-base ml-2 text-right">
        {t(`statuses.${order.status}`)}
      </Text>
    </TouchableOpacity>
  );

  const renderReservationItem = (r: IMappedReservation) => (
    <TouchableOpacity
      key={r.id}
      className="flex-row items-center justify-between bg-transparent min-h-[72px] py-2 pr-2"
      onPress={() => router.push(`/reservation/${r.id}`)}
    >
      <View className="flex-row items-center gap-4 flex-1">
        <View className="w-12 h-12 rounded-lg bg-[#c6102e]/10 items-center justify-center">
          <Ionicons name="calendar-outline" size={24} color="#c6102e" />
        </View>

        <View className="flex-1">
          <Text className="text-white text-base font-medium">
            {t("profile.reservationNumber", {
              number: r.uuid.slice(0, 8).toUpperCase(),
            })}
          </Text>
          <Text className="text-[#c9929b] text-sm">{r.vineyard}</Text>
          <Text className="text-[#c9929b] text-sm">{r.date}</Text>
        </View>
      </View>

      <Text className="text-white text-base ml-2 text-right">
        {t(`visitStatus.${r.status}`) ?? r.status}
      </Text>
    </TouchableOpacity>
  );

  const currentItems = activeTab === "orders" ? orders : reservations;

  const hasMore = currentItems.length > 5;

  // ---------------- LOADING UI ----------------
  if (loading) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#c6102e" />
          <Text className="mt-4 text-white">Cargando...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* HEADER */}
      <View className="flex-row items-center justify-between p-4 pb-2">
        <TouchableOpacity
          className="w-12 h-12 items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-bold flex-1 text-center">
          {t("profile.title")}
        </Text>

        <View className="w-12 h-12" />
        <LanguageSelector />
      </View>

      {/* SCROLL CONTENT */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* PROFILE HEADER */}
        <View className="p-4 mt-4 items-center">
          <View className="gap-4 items-center">
            <View className="w-32 h-32 rounded-full overflow-hidden bg-[#c6102e]/20">
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  className="w-full h-full"
                />
              ) : (
                <View className="w-full h-full items-center justify-center">
                  <Ionicons name="person" size={64} color="#c6102e" />
                </View>
              )}
            </View>

            <View className="items-center">
              <Text className="text-white text-[22px] font-bold text-center">
                {user?.name || t("profile.user")}
              </Text>
              <Text className="text-[#c9929b] text-base text-center">
                {user?.email || t("profile.defaultEmail")}
              </Text>
            </View>
          </View>
        </View>

        {/* SECTION TITLE */}
        <Text className="text-white text-lg font-bold px-4 pb-2 pt-6">
          {t("profile.myActivity")}
        </Text>

        {/* TABS */}
        <View className="px-4 pb-3">
          <View className="flex-row border-b border-[#67323b]">
            <TouchableOpacity
              className={`flex-1 items-center justify-center py-4 border-b-[3px] ${
                activeTab === "orders"
                  ? "border-[#c6102e]"
                  : "border-transparent"
              }`}
              onPress={() => setActiveTab("orders")}
            >
              <Text
                className={`text-sm font-bold ${
                  activeTab === "orders" ? "text-[#c6102e]" : "text-[#c9929b]"
                }`}
              >
                {t("profile.orders")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 items-center justify-center py-4 border-b-[3px] ${
                activeTab === "reservations"
                  ? "border-[#c6102e]"
                  : "border-transparent"
              }`}
              onPress={() => setActiveTab("reservations")}
            >
              <Text
                className={`text-sm font-bold ${
                  activeTab === "reservations"
                    ? "text-[#c6102e]"
                    : "text-[#c9929b]"
                }`}
              >
                {t("profile.reservations")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* LIST ITEMS */}
        <View className="px-4 py-4 gap-3">
          {currentItems.length === 0 ? (
            <Text className="text-center text-[#c9929b] mt-4">
              {t("profile.noData")}
            </Text>
          ) : activeTab === "orders" ? (
            orders.map((o: IMappedOrder) => renderOrderItem(o))
          ) : (
            reservations.map((r: IMappedReservation) =>
              renderReservationItem(r)
            )
          )}

          {hasMore && (
            <TouchableOpacity
              className="mt-4 py-3 items-center border-t border-[#67323b]"
              onPress={handleViewMore}
            >
              <Text className="text-[#c6102e] text-base font-medium">
                {t("profile.viewMore", {
                  count: currentItems.length - 5,
                  type:
                    activeTab === "orders"
                      ? t("profile.orders").toLowerCase()
                      : t("profile.reservations").toLowerCase(),
                })}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ACTION BUTTONS */}
        <View className="px-4 py-8 mt-auto gap-3">
          <TouchableOpacity
            className="w-full h-12 bg-[#c6102e] rounded-lg items-center justify-center"
            onPress={handleEditProfile}
          >
            <Text className="text-white font-bold">
              {t("profile.editProfile")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full h-12 bg-transparent rounded-lg items-center justify-center"
            onPress={handleLogout}
          >
            <Text className="text-[#c6102e] font-bold">{t("auth.logout")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}
