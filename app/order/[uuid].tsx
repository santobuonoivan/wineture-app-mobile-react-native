import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { Screen } from "../../components/Screen";
import { useLanguage } from "../../hooks/useLanguage";
import { getOrderDetailByUUID } from "../../lib";
import { IOrder, IOrderItem, IOrderTrackingItem } from "../../interfaces";

export default function OrderDetailScreen() {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const { t } = useLanguage();

  const [orderDetails, setOrderDetails] = React.useState<IOrder | null>(null);

  useEffect(() => {
    getOrderDetailByUUID({ uuid }).then((res) => {
      if (res?.status === 200 && res.data) {
        const order = res.data;
        console.log("Order details fetched:", order);
        setOrderDetails(order);
      }
    });
  }, [uuid]);

  const renderOrderItem = (item: IOrderItem) => (
    <View
      key={item.orderItemId}
      className="flex-row items-center gap-4 p-4 border-b border-[#67323b] last:border-b-0"
    >
      <Image
        source={{ uri: item.wine.image }}
        className="w-16 h-16 rounded-lg"
      />
      <View className="flex-1 justify-center gap-1">
        <Text className="text-white text-base font-medium">
          {item.wine.wineName}
        </Text>
        <Text className="text-[#c9929b] text-sm">
          {t("orderDetails.quantity", { count: item.quantity })}
        </Text>
      </View>
      <Text className="text-white text-base font-medium">
        ${item.amount} USD
      </Text>
    </View>
  );

  const getStatusIcon = (statusCode: string) => {
    switch (statusCode) {
      case "DELIVERED":
        return <MaterialIcons name="check" size={14} color="white" />;
      case "SHIPPED":
        return <MaterialIcons name="local-shipping" size={14} color="white" />;
      case "PROCESSING":
        return <MaterialIcons name="inventory" size={14} color="white" />;
      default:
        return <MaterialIcons name="receipt-long" size={14} color="white" />;
    }
  };

  const getStatusColor = (statusCode: string) => {
    switch (statusCode) {
      case "DELIVERED":
        return "#22c55e";
      case "SHIPPED":
        return "#3b82f6";
      case "PROCESSING":
        return "#f97316";
      default:
        return "#c6102e";
    }
  };

  const renderTimelineItem = (
    item: IOrderTrackingItem,
    index: number,
    isLast: boolean
  ) => (
    <View key={item.trackingId} className="flex-row items-start gap-4 relative">
      {!isLast && (
        <View className="absolute left-[9px] top-5 bottom-0 w-0.5 bg-[#67323b]" />
      )}
      <View
        className="w-5 h-5 rounded-full items-center justify-center mt-0.5 z-10"
        style={{ backgroundColor: getStatusColor(item.status.statusCode) }}
      >
        {getStatusIcon(item.status.statusCode)}
      </View>
      <View className="flex-1">
        <Text className="font-semibold text-white">
          {t(`trackingStatuses.${item.status.statusCode.toLowerCase()}`)}
        </Text>
        <Text className="text-sm text-[#c9929b]">
          {new Date(item.created_at).toLocaleDateString()} -{" "}
          {new Date(item.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
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
        {!orderDetails ? (
          <View className="flex-1 justify-center items-center p-6">
            <Text className="text-white text-lg">{t("common.loading")}</Text>
          </View>
        ) : (
          <View className="p-6 gap-8">
            {/* Order Header Section */}
            <View className="bg-[#482329] p-5 rounded-xl gap-4">
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-white text-lg font-bold">
                    {t("orderDetails.orderNumber", {
                      number: orderDetails.uuid.slice(-9),
                    })}
                  </Text>
                  <Text className="text-[#c9929b] text-sm mt-1">
                    {new Date(orderDetails.orderDate).toLocaleDateString()}
                  </Text>
                </View>
                <View
                  className="flex-row items-center gap-2 rounded-full px-3 py-1"
                  style={{ backgroundColor: `${orderDetails.status.color}20` }}
                >
                  <View
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: orderDetails.status.color }}
                  />
                  <Text
                    className="text-sm font-medium"
                    style={{ color: orderDetails.status.color }}
                  >
                    {t(`statuses.${orderDetails.status.statusName}`)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Order Items Section */}
            <View className="gap-4">
              <Text className="text-white text-lg font-bold">
                {t("orderDetails.orderSummary")}
              </Text>
              <View className="bg-[#482329] rounded-xl overflow-hidden">
                {orderDetails.orderItems.map(renderOrderItem)}
              </View>
            </View>

            {/* Shipping Address Section */}
            <View className="gap-4">
              <Text className="text-white text-lg font-bold">
                {t("orderDetails.shippingAddress")}
              </Text>
              <View className="bg-[#482329] p-4 rounded-xl">
                <Text className="text-white text-base leading-relaxed">
                  {orderDetails.user.firstname} {orderDetails.user.firstsurname}
                  {"\n"}
                  {orderDetails.userAddress.address}
                  {"\n"}
                  {orderDetails.userAddress.region},{" "}
                  {orderDetails.userAddress.state}
                  {"\n"}
                  {orderDetails.userAddress.country} (
                  {orderDetails.userAddress.postalCode})
                </Text>
              </View>
            </View>

            {/* Price Summary Section */}
            <View className="gap-4">
              <Text className="text-white text-lg font-bold">
                {t("orderDetails.priceSummary")}
              </Text>
              <View className="bg-[#482329] p-4 rounded-xl gap-3">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[#c9929b] text-base">
                    {t("orderDetails.subtotal")}
                  </Text>
                  <Text className="text-white text-base">
                    ${orderDetails.subTotalAmount} USD
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-[#c9929b] text-base">
                    {t("orderDetails.shipping")}
                  </Text>
                  <Text className="text-white text-base">
                    ${orderDetails.shippingCost} USD
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-[#c9929b] text-base">
                    {t("orderDetails.taxes")}
                  </Text>
                  <Text className="text-white text-base">
                    ${orderDetails.tax} USD
                  </Text>
                </View>
                {orderDetails.discountApplied &&
                  parseFloat(orderDetails.discountApplied) > 0 && (
                    <View className="flex-row justify-between items-center">
                      <Text className="text-[#c9929b] text-base">
                        {t("orderDetails.discounts")}
                      </Text>
                      <Text className="text-green-400 text-base">
                        -${orderDetails.discountApplied} USD
                      </Text>
                    </View>
                  )}
                {orderDetails.comission &&
                  parseFloat(orderDetails.comission) > 0 && (
                    <View className="flex-row justify-between items-center">
                      <Text className="text-[#c9929b] text-base">{t("orderDetails.commission")}</Text>
                      <Text className="text-white text-base">
                        ${orderDetails.comission} USD
                      </Text>
                    </View>
                  )}
                <View className="h-px w-full bg-[#67323b] my-2" />
                <View className="flex-row justify-between items-center">
                  <Text className="text-white text-lg font-bold">
                    {t("orderDetails.total")}
                  </Text>
                  <Text className="text-[#c6102e] text-lg font-bold">
                    ${orderDetails.totalAmount} USD
                  </Text>
                </View>
              </View>
            </View>

            {/* Order Tracking Section */}
            <View className="gap-4 pb-4">
              <Text className="text-white text-lg font-bold">
                {t("orderDetails.orderTracking")}
              </Text>
              <View className="bg-[#482329] rounded-xl overflow-hidden pt-4 py-4">
                <ScrollView
                  className="p-5"
                  style={{ maxHeight: 320 }}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                >
                  <View className="gap-6">
                    {orderDetails.orderTrackings
                      .sort(
                        (a, b) =>
                          new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime()
                      )
                      .map((item, index, array) =>
                        renderTimelineItem(
                          item,
                          index,
                          index === array.length - 1
                        )
                      )}
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
