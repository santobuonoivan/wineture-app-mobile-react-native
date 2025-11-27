import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { Screen } from "../../components/Screen";
import { useLanguage } from "../../hooks/useLanguage";
import { getOrderDetailByUUID } from "../../lib";
import { IOrder, IOrderItem } from "../../interfaces";

export default function OrderDetailScreen() {
  const { uuid } = useLocalSearchParams<{ uuid: string }>();
  const { t } = useLanguage();

  const [orderDetails, setOrderDetails] = React.useState<IOrder | null>(null);

  useEffect(() => {
    getOrderDetailByUUID({ uuid }).then((res) => {
      if (res?.status === 200 && res.data) {
        const o = res.data;

        const mapped: any = {
          uuid: o.uuid,
          orderId: o.orderId,
          orderDate: o.orderDate,
          status: {
            statusId: o.status?.statusId,
            statusName: o.status?.statusName?.toLowerCase(),
            color: o.status?.color,
          },
          subTotalAmount: o.subTotalAmount,
          shippingCost: o.shippingCost,
          tax: o.tax,
          totalAmount: o.totalAmount,
          orderItems: (o.orderItems || []).map((it: any) => ({
            orderItemId: it.orderItemId,
            quantity: it.quantity,
            amount: it.amount,
            wine: {
              wineId: it.wine?.wineId,
              wineName: it.wine?.wineName,
              image: it.wine?.image,
            },
          })),
          userAddress: {
            address: o.userAddress?.address,
            region: o.userAddress?.region,
            state: o.userAddress?.state,
            country: o.userAddress?.country,
            postalCode: o.userAddress?.postalCode,
          },
          user: {
            firstname: o.user?.firstname,
            firstsurname: o.user?.firstsurname,
          },
        };

        setOrderDetails(mapped);
      }
    });
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
        ${item.amount} USD
      </Text>
    </View>
  );

  return (
    <Screen>
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
            <View>
              <Text className="text-white text-xl font-bold">
                {t("orderDetails.orderNumber", { number: orderDetails.uuid })}
              </Text>

              <View className="flex-row items-center gap-2 mt-2">
                <Text className="text-white/80">
                  {new Date(orderDetails.orderDate).toLocaleDateString()}
                </Text>

                <View className="h-2 w-2 rounded-full bg-white/40" />

                <Text style={{ color: orderDetails.status.color }}>
                  {t(`statuses.${orderDetails.status.statusName}`)}
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-white text-lg font-bold mb-3">
                {t("orderDetails.orderSummary")}
              </Text>

              <View className="bg-[#421921] p-4 rounded-2xl">
                {orderDetails.orderItems.map(renderOrderItem)}
              </View>
            </View>

            <View className="gap-3">
              <View className="flex-row justify-between">
                <Text className="text-white/80">
                  {t("orderDetails.subtotal")}
                </Text>
                <Text className="text-white">
                  ${orderDetails.subTotalAmount} USD
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-white/80">
                  {t("orderDetails.shipping")}
                </Text>
                <Text className="text-white">
                  ${orderDetails.shippingCost} USD
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-white/80">{t("orderDetails.taxes")}</Text>
                <Text className="text-white">${orderDetails.tax} USD</Text>
              </View>

              <View className="border-b border-[#67323b]/50 my-2" />

              <View className="flex-row justify-between mt-2">
                <Text className="text-white text-lg font-bold">
                  {t("orderDetails.total")}
                </Text>
                <Text className="text-white text-lg font-bold">
                  ${orderDetails.totalAmount} USD
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-white text-lg font-bold mb-3">
                {t("orderDetails.shippingAddress")}
              </Text>

              <View className="bg-[#421921] p-4 rounded-2xl">
                <Text className="text-white">
                  {orderDetails.user.firstname} {orderDetails.user.firstsurname}
                </Text>
                <Text className="text-white mt-1">
                  {orderDetails.userAddress.address}
                </Text>
                <Text className="text-white">
                  {orderDetails.userAddress.region},{" "}
                  {orderDetails.userAddress.state}
                </Text>
                <Text className="text-white">
                  {orderDetails.userAddress.country} (
                  {orderDetails.userAddress.postalCode})
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
