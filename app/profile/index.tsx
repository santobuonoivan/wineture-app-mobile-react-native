import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from "../../hooks/useLanguage";
import { router } from "expo-router";
import { LanguageSelector } from "../../components/LanguageSelector";
import { Screen } from "../../components/Screen";

// Tipos para los datos
interface Order {
  id: string;
  number: string;
  date: string;
  amount: string;
  status: string;
}

interface Reservation {
  id: string;
  number: string;
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

  // Datos de ejemplo - pedidos
  const orders: Order[] = [
    {
      id: "1",
      number: "VIN-1024",
      date: "15 de Octubre, 2023",
      amount: "$125.50",
      status: "Entregado",
    },
    {
      id: "2",
      number: "VIN-1021",
      date: "2 de Septiembre, 2023",
      amount: "$89.00",
      status: "Entregado",
    },
    {
      id: "3",
      number: "VIN-1015",
      date: "18 de Julio, 2023",
      amount: "$210.00",
      status: "Entregado",
    },
    {
      id: "4",
      number: "VIN-1012",
      date: "5 de Junio, 2023",
      amount: "$156.75",
      status: "En tránsito",
    },
    {
      id: "5",
      number: "VIN-1008",
      date: "22 de Mayo, 2023",
      amount: "$98.25",
      status: "Entregado",
    },
    {
      id: "6",
      number: "VIN-1005",
      date: "10 de Mayo, 2023",
      amount: "$234.00",
      status: "Entregado",
    },
  ];

  // Datos de ejemplo - reservas
  const reservations: Reservation[] = [
    {
      id: "1",
      number: "RES-2024",
      date: "25 de Noviembre, 2024",
      vineyard: "Viña Santa Rita",
      status: "Confirmada",
    },
    {
      id: "2",
      number: "RES-2023",
      date: "18 de Noviembre, 2024",
      vineyard: "Viña Concha y Toro",
      status: "Pendiente",
    },
    {
      id: "3",
      number: "RES-2022",
      date: "10 de Noviembre, 2024",
      vineyard: "Viña Undurraga",
      status: "Confirmada",
    },
    {
      id: "4",
      number: "RES-2021",
      date: "3 de Noviembre, 2024",
      vineyard: "Viña Casillero del Diablo",
      status: "Completada",
    },
    {
      id: "5",
      number: "RES-2020",
      date: "28 de Octubre, 2024",
      vineyard: "Viña Montes",
      status: "Completada",
    },
    {
      id: "6",
      number: "RES-2019",
      date: "20 de Octubre, 2024",
      vineyard: "Viña Errazuriz",
      status: "Cancelada",
    },
  ];

  const handleEditProfile = () => {
    // Navegar a pantalla de editar perfil
    router.push("/profile/edit");
  };

  const handleLogout = () => {
    signOut();
    router.replace("/");
  };

  const handleViewMore = () => {
    if (activeTab === "orders") {
      router.push("/profile/orders");
    } else {
      router.push("/profile/reservations");
    }
  };

  const renderOrderItem = (order: Order) => (
    <TouchableOpacity
      key={order.id}
      className="flex-row items-center justify-between bg-transparent min-h-[72px] py-2 pr-2"
      onPress={() => router.push(`/order/${order.id}`)}
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
        {order.status}
      </Text>
    </TouchableOpacity>
  );

  const renderReservationItem = (reservation: Reservation) => (
    <View
      key={reservation.id}
      className="flex-row items-center justify-between bg-transparent min-h-[72px] py-2 pr-2"
    >
      <View className="flex-row items-center gap-4 flex-1">
        <View className="w-12 h-12 rounded-lg bg-[#c6102e]/10 items-center justify-center">
          <Ionicons name="calendar-outline" size={24} color="#c6102e" />
        </View>
        <View className="flex-1">
          <Text className="text-white text-base font-medium">
            {t("profile.reservationNumber", { number: reservation.number })}
          </Text>
          <Text className="text-[#c9929b] text-sm">
            {reservation.date} - {reservation.vineyard}
          </Text>
        </View>
      </View>
      <Text className="text-white text-base ml-2 text-right">
        {reservation.status}
      </Text>
    </View>
  );

  const currentItems = activeTab === "orders" ? orders : reservations;
  const displayItems = currentItems.slice(0, 5);
  const hasMore = currentItems.length > 5;

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
          {t("profile.title")}
        </Text>
        <View className="w-12 h-12" />
        <LanguageSelector />
      </View>

      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="p-4 mt-4 items-center">
          <View className="gap-4 items-center">
            {/* Avatar */}
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

            {/* User Info */}
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

        {/* Section Header */}
        <Text className="text-white text-lg font-bold px-4 pb-2 pt-6">
          {t("profile.myActivity")}
        </Text>

        {/* Tabs */}
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

        {/* List Items */}
        <View className="px-4 py-4 gap-3">
          {activeTab === "orders"
            ? displayItems.map((item) => renderOrderItem(item as Order))
            : displayItems.map((item) =>
                renderReservationItem(item as Reservation)
              )}

          {/* Ver más footer */}
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

        {/* Actions Section */}
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
