import React, { use, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { Screen } from "../../components/Screen";
import { useLanguage } from "../../hooks/useLanguage";
import { getOrderDetailByUUID } from "../../lib";
import { IOrder, IOrderItem, IOrderTrackingItem } from "../../interfaces";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const [orderDetails, setOrderDetails] = React.useState<IOrder>();

  useEffect(() => {
    getOrderDetailByUUID({ uuid: Number(id) }).then((data) => {
      if (data.status == 200 && data.data) {
        setOrderDetails(data.data as IOrder);
      }
    });
  }, [id]);

  const renderOrderItem = (item: IOrderItem) => (
    <View key={item.orderItemId} className="flex-row items-center gap-4 py-3">
      <Image
        source={{ uri: item.wine.image }}
        className="w-16 h-16 rounded-lg"
      />
      <View className="flex-1">
        <Text className="text-white text-base font-medium line-clamp-1">
          {item.wine.wineName}
        </Text>
        <Text className="text-[#c9929b] text-sm">
          {t("orderDetails.quantity", { count: item.quantity })}
        </Text>
      </View>
      <Text className="text-white text-base font-medium">${item.amount}</Text>
    </View>
  );

  const renderTimelineItem = (item: IOrderTrackingItem, index: number) => (
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
        {index < orderDetails?.orderTrackings?.length - 1 && (
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
                <Text className="text-[#c9929b] text-base">
                  {t("orderDetails.subtotal")}
                </Text>
                <Text className="text-white text-base">
                  ${orderDetails.subtotal.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-[#c9929b] text-base">
                  {t("orderDetails.shipping")}
                </Text>
                <Text className="text-white text-base">
                  ${orderDetails.shipping.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-[#c9929b] text-base">
                  {t("orderDetails.taxes")}
                </Text>
                <Text className="text-white text-base">
                  ${orderDetails.taxes.toFixed(2)}
                </Text>
              </View>
              <View className="h-px bg-[#67323b] my-3" />
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-lg font-bold">
                  {t("orderDetails.total")}
                </Text>
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
