import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { Screen } from "../../components/Screen";
import { useLanguage } from "../../hooks/useLanguage";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  number: string;
  date: string;
  status: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  timeline: {
    title: string;
    date: string;
    completed: boolean;
  }[];
}

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();

  // Datos de ejemplo - esto vendría de una API
  const orderDetails: OrderDetails = {
    id: "1",
    number: "VIN-1024",
    date: "15 de Octubre, 2023",
    status: t("orderDetails.status.enCamino"),
    items: [
      {
        id: "1",
        name: "Tinto Reserva 2018",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAmdjVp9yrgYbRdTy0nE4rJy83dW6pwOHlH2cPaXtXGqHzgbRaTkvROnkx7g7jQJ2zmB5Fxgy46rY9X8kMFQWPC6b8-h96oTym4T6IXmUiOto2Jl_w2Sdq1z_zEtNr5CogcGtB9zdOfpdNb5I6jZMHAeR1BDaf9KA9E7j1l_p8XetzM40qB9og1XBcIrcHs5v2ZZVW5Ib2L0V1ov22NjuPtIHhEOUDEnCaDSdMT_bg5JuzxE3hlH-G65Fim3CGrqv8yxFWOMv1fSJM",
        quantity: 2,
        price: 75.0,
      },
      {
        id: "2",
        name: "Blanco Chardonnay",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC7UiI1HuAazbADg86ICjVGaY0m3TDW_50YFGC_pEvevhPKoEUN6xdLk_CGWYEZt6kz_ONWS4pYmh5ZJR6KxXf-00hHVCZ1TfHQaYpxcpZGzAXKeLHSMoaUdycahtqjZH1ogDN-Fpqtet3VZ6Wn2_gN0UjpTDetzuIQ2710cetXokSa_d0IWczQBUQJsmLjtaKsgftR5ewjEkEa1b8uIvZMAOnoevCxbJRYFdjO8EEgfIAKfb7wEQSDuWwyFzzTXnIN6sFhtNe1w6I",
        quantity: 1,
        price: 25.5,
      },
    ],
    subtotal: 100.5,
    shipping: 10.0,
    taxes: 15.0,
    total: 125.5,
    shippingAddress: {
      name: "Alejandra Vargas",
      address: "Calle de las Vides, 123, Apto 4B",
      city: "Valle del Vino, CA 90210",
      country: "Estados Unidos",
    },
    timeline: [
      {
        title: t("orderDetails.orderSent"),
        date: "16 de Octubre, 2023 - 09:30 AM",
        completed: true,
      },
      {
        title: t("orderDetails.orderProcessed"),
        date: "15 de Octubre, 2023 - 04:15 PM",
        completed: true,
      },
      {
        title: t("orderDetails.orderPlaced"),
        date: "15 de Octubre, 2023 - 02:00 PM",
        completed: false,
      },
    ],
  };

  const renderOrderItem = (item: OrderItem) => (
    <View key={item.id} className="flex-row items-center gap-4 py-3">
      <Image source={{ uri: item.image }} className="w-16 h-16 rounded-lg" />
      <View className="flex-1">
        <Text className="text-white text-base font-medium line-clamp-1">
          {item.name}
        </Text>
        <Text className="text-[#c9929b] text-sm">
          {t("orderDetails.quantity", { count: item.quantity })}
        </Text>
      </View>
      <Text className="text-white text-base font-medium">
        ${item.price.toFixed(2)}
      </Text>
    </View>
  );

  const renderTimelineItem = (item: any, index: number) => (
    <View key={index} className="flex-row gap-4">
      <View className="flex-col items-center">
        <View
          className={`w-5 h-5 rounded-full items-center justify-center ${
            item.completed ? "bg-[#c6102e]" : "bg-[#67323b]"
          }`}
        >
          {item.completed && (
            <Ionicons name="checkmark" size={12} color="white" />
          )}
        </View>
        {index < orderDetails.timeline.length - 1 && (
          <View
            className={`w-px flex-1 mt-2 ${
              item.completed ? "bg-[#c6102e]" : "bg-[#67323b]"
            }`}
            style={{ height: 32 }}
          />
        )}
      </View>
      <View className="pb-8 flex-1">
        <Text className="text-white text-base font-medium">{item.title}</Text>
        <Text className="text-[#c9929b] text-sm">{item.date}</Text>
      </View>
    </View>
  );

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
          {t("orderDetails.title")}
        </Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1">
        <View className="p-6 gap-8">
          {/* Order Header */}
          <View className="gap-2">
            <Text className="text-white text-2xl font-bold">
              {t("orderDetails.orderNumber", { number: orderDetails.number })}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-[#c9929b] text-sm">
                {orderDetails.date}
              </Text>
              <View className="w-1 h-1 rounded-full bg-[#c9929b]/50" />
              <Text className="text-[#c6102e] text-sm font-bold">
                {orderDetails.status}
              </Text>
            </View>
          </View>

          {/* Order Summary */}
          <View className="gap-4">
            <Text className="text-white text-lg font-bold">
              {t("orderDetails.orderSummary")}
            </Text>
            <View className="bg-[#482329] rounded-xl p-4">
              {orderDetails.items.map((item, index) => (
                <View key={item.id}>
                  {renderOrderItem(item)}
                  {index < orderDetails.items.length - 1 && (
                    <View className="h-px bg-[#67323b] my-2" />
                  )}
                </View>
              ))}
            </View>

            {/* Totals */}
            <View className="gap-2 pt-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-[#c9929b] text-base">{t("orderDetails.subtotal")}</Text>
                <Text className="text-white text-base">
                  ${orderDetails.subtotal.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-[#c9929b] text-base">{t("orderDetails.shipping")}</Text>
                <Text className="text-white text-base">
                  ${orderDetails.shipping.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-[#c9929b] text-base">{t("orderDetails.taxes")}</Text>
                <Text className="text-white text-base">
                  ${orderDetails.taxes.toFixed(2)}
                </Text>
              </View>
              <View className="h-px bg-[#67323b] my-3" />
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-lg font-bold">{t("orderDetails.total")}</Text>
                <Text className="text-white text-lg font-bold">
                  ${orderDetails.total.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* Shipping Address */}
          <View className="gap-4">
            <Text className="text-white text-lg font-bold">
              {t("orderDetails.shippingAddress")}
            </Text>
            <View className="bg-[#482329] rounded-xl p-4">
              <Text className="text-white text-base leading-relaxed">
                {orderDetails.shippingAddress.name}
                {"\n"}
                {orderDetails.shippingAddress.address}
                {"\n"}
                {orderDetails.shippingAddress.city}
                {"\n"}
                {orderDetails.shippingAddress.country}
              </Text>
            </View>
          </View>

          {/* Order Timeline */}
          <View className="gap-4 pb-4">
            <Text className="text-white text-lg font-bold">
              {t("orderDetails.orderHistory")}
            </Text>
            <View>
              {orderDetails.timeline.map((item, index) =>
                renderTimelineItem(item, index)
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
