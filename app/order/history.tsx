import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Screen } from "../../components/Screen";
import { useLanguage } from "../../hooks/useLanguage";
import { useAuth } from "../../hooks/useAuth";
import { getOrdersByUser } from "../../lib";
import { IOrdersByUserResponse } from "../../interfaces";

export default function OrderHistory() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadOrders();
    }
  }, [user?.id]);

  const mockUserId = 15; // For testing purposes
  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrdersByUser({ id: Number(mockUserId) });
      if (response.status === 200 && response.data) {
        // Sort by date descending (newest first)
        const sortedOrders = response.data.sort((a: any, b: any) => {
          return (
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
        });
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (statusName: string) => {
    switch (statusName?.toUpperCase()) {
      case "DELIVERED":
        return "#22c55e";
      case "SHIPPED":
        return "#3b82f6";
      case "PROCESSING":
        return "#f97316";
      case "CANCELLED":
        return "#ef4444";
      default:
        return "#c6102e";
    }
  };

  const handleOrderPress = (orderUuid: string) => {
    router.push(`/order/${orderUuid}`);
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
          {t("profile.orderHistory")}
        </Text>
        <View className="w-10 h-10" />
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#d41132" />
        </View>
      ) : orders.length === 0 ? (
        <View className="flex-1 justify-center items-center p-6">
          <Ionicons name="receipt-outline" size={48} color="#c9929b" />
          <Text className="text-white text-lg font-semibold mt-4 text-center">
            {t("orders.noOrders")}
          </Text>
          <Text className="text-[#c9929b] text-sm mt-2 text-center">
            {t("orders.noOrdersDescription")}
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 p-4">
          <View className="gap-3 pb-6">
            {orders.map((order) => (
              <TouchableOpacity
                key={order.uuid}
                onPress={() => handleOrderPress(order.uuid)}
                className="bg-[#482329] rounded-xl p-4 active:opacity-70"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-1">
                    <Text className="text-white text-base font-bold">
                      {t("orderDetails.orderNumber", {
                        number: order.uuid.slice(-9),
                      })}
                    </Text>
                    <Text className="text-[#c9929b] text-sm mt-1">
                      {new Date(order.orderDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                  </View>
                  <View
                    className="px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${getStatusColor(order.status.statusName)}20`,
                    }}
                  >
                    <Text
                      className="text-sm font-medium"
                      style={{ color: getStatusColor(order.status.statusName) }}
                    >
                      {t(`statuses.${order.status.statusName}`)}
                    </Text>
                  </View>
                </View>

                {/* Order Items Preview */}
                {order.orderItems && order.orderItems.length > 0 && (
                  <View className="border-t border-[#67323b] pt-3 mt-3">
                    <Text className="text-[#c9929b] text-xs mb-2">
                      {order.orderItems.length}{" "}
                      {order.orderItems.length === 1 ? "item" : "items"}
                    </Text>
                    <View className="flex-row gap-2">
                      {order.orderItems
                        .slice(0, 3)
                        .map((item: any, idx: number) => (
                          <Image
                            key={idx}
                            source={{ uri: item.wine.image }}
                            className="w-10 h-10 rounded"
                          />
                        ))}
                      {order.orderItems.length > 3 && (
                        <View className="w-10 h-10 rounded bg-[#330309] items-center justify-center">
                          <Text className="text-white text-xs font-bold">
                            +{order.orderItems.length - 3}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}

                {/* Total Amount */}
                <View className="border-t border-[#67323b] pt-3 mt-3 flex-row justify-between items-center">
                  <Text className="text-[#c9929b] text-sm">
                    {t("orderDetails.total")}
                  </Text>
                  <Text className="text-white text-lg font-bold">
                    ${order.totalAmount} USD
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}
