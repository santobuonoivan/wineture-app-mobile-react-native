import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { Screen } from "../../components/Screen";
import { useLanguage } from "../../hooks/useLanguage";
import { getOrderDetailByUUID } from "../../lib";
import { IOrder, IOrderItem, IOrderTrackingItem } from "../../interfaces";

export default function OrderDetailScreen() {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const { t } = useLanguage();
  const [orderDetails, setOrderDetails] = React.useState<IOrder>();

  // Normaliza valores numéricos que vienen como string
  const parseAmount = (value: any) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const response = await getOrderDetailByUUID({ uuid });
        if (!active) return;

        if (response.status === 200 && response.data) {
          const data = response.data as IOrder;

          // Aseguramos arrays válidos
          data.orderItems = Array.isArray(data.orderItems)
            ? data.orderItems
            : [];

          data.orderTrackings = Array.isArray(data.orderTrackings)
            ? data.orderTrackings
            : [];

          // Ordenar timeline por fecha ASC
          data.orderTrackings = data.orderTrackings.sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          );

          // Normalización de montos
          data.subTotalAmount = parseAmount(data.subTotalAmount).toString();
          data.shippingCost = parseAmount(data.shippingCost).toString();
          data.tax = parseAmount(data.tax).toString();
          data.totalAmount = parseAmount(data.totalAmount).toString();

          // Normalizar nombre de status
          if (data.status?.statusName) {
            const normalized = data.status.statusName.toLowerCase();
            data.status.statusName = t(`statuses.${normalized}`);
          }

          // Normalizar status del timeline
          data.orderTrackings = data.orderTrackings.map((tItem) => {
            const normalized = tItem.status.statusName.toLowerCase();
            return {
              ...tItem,
              status: {
                ...tItem.status,
                statusName: t(`statuses.${normalized}`),
              },
            };
          });

          setOrderDetails(data);
        }
      } catch (e) {
        console.log("Order detail error:", e);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [uuid]);

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
      <Text className="text-white text-base font-medium">
        ${parseAmount(item.amount).toFixed(2)}
      </Text>
    </View>
  );

  const renderTimelineItem = (item: IOrderTrackingItem, index: number) => {
    const deliveredCode = "delivered";
    const isCompleted = item.status.statusCode?.toLowerCase() === deliveredCode;

    return (
      <View key={index} className="flex-row gap-4">
        <View className="flex-col items-center">
          <View
            className={`w-5 h-5 rounded-full items-center justify-center ${
              isCompleted ? "bg-[#c6102e]" : "bg-[#67323b]"
            }`}
          >
            {isCompleted && (
              <Ionicons name="checkmark" size={12} color="white" />
            )}
          </View>

          {index < (orderDetails?.orderTrackings?.length || 0) - 1 && (
            <View
              className={`w-px flex-1 mt-2 ${
                isCompleted ? "bg-[#c6102e]" : "bg-[#67323b]"
              }`}
              style={{ height: 32 }}
            />
          )}
        </View>

        <View className="pb-8 flex-1">
          <Text className="text-white text-base font-medium">
            {item.status.statusName}
          </Text>
          <Text className="text-[#c9929b] text-sm">
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>
    );
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
          {t("orderDetails.title")}
        </Text>

        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1">
        {orderDetails ? (
          <View className="p-6 gap-8">
            {/* Order Header */}
            <View className="gap-2">
              <Text className="text-white text-2xl font-bold">
                {t("orderDetails.orderNumber", {
                  number: orderDetails.uuid || "",
                })}
              </Text>

              <View className="flex-row items-center gap-2">
                <Text className="text-[#c9929b] text-sm">
                  {orderDetails.orderDate
                    ? new Date(orderDetails.orderDate).toLocaleDateString()
                    : ""}
                </Text>

                <View className="w-1 h-1 rounded-full bg-[#c9929b]/50" />

                <Text className="text-[#c6102e] text-sm font-bold">
                  {orderDetails.status?.statusName || ""}
                </Text>
              </View>
            </View>

            {/* Order Summary */}
            <View className="gap-4">
              <Text className="text-white text-lg font-bold">
                {t("orderDetails.orderSummary")}
              </Text>

              <View className="bg-[#482329] rounded-xl p-4">
                {orderDetails.orderItems.map((item, index) => (
                  <View key={item.orderItemId}>
                    {renderOrderItem(item)}
                    {index < orderDetails.orderItems.length - 1 && (
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
                    ${parseAmount(orderDetails.subTotalAmount).toFixed(2)} USD
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-[#c9929b] text-base">
                    {t("orderDetails.shipping")}
                  </Text>
                  <Text className="text-white text-base">
                    ${parseAmount(orderDetails.shippingCost).toFixed(2)} USD
                  </Text>
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-[#c9929b] text-base">
                    {t("orderDetails.taxes")}
                  </Text>
                  <Text className="text-white text-base">
                    ${parseAmount(orderDetails.tax).toFixed(2)} USD
                  </Text>
                </View>

                <View className="h-px bg-[#67323b] my-3" />

                <View className="flex-row justify-between items-center">
                  <Text className="text-white text-lg font-bold">
                    {t("orderDetails.total")}
                  </Text>
                  <Text className="text-white text-lg font-bold">
                    ${parseAmount(orderDetails.totalAmount).toFixed(2)} USD
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
                  {orderDetails.user?.firstname}{" "}
                  {orderDetails.user?.firstsurname}
                  {"\n"}
                  {orderDetails.userAddress?.address}
                  {"\n"}
                  {orderDetails.userAddress?.region},{" "}
                  {orderDetails.userAddress?.state}
                  {"\n"}
                  {orderDetails.userAddress?.country}{" "}
                  {orderDetails.userAddress?.postalCode}
                </Text>
              </View>
            </View>

            {/* Order Timeline */}
            <View className="gap-4 pb-4">
              <Text className="text-white text-lg font-bold">
                {t("orderDetails.orderHistory")}
              </Text>

              <View>
                {orderDetails.orderTrackings.map((item, index) =>
                  renderTimelineItem(item, index)
                )}
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center p-6">
            <Text className="text-white text-lg">Loading...</Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
