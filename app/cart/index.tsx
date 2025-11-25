import { Link, router } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Screen } from "../../components/Screen";
import { useCartStore } from "../../store/useCartStore";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ConfirmModal } from "../../components/ui/ConfirmModal";
import { useLanguage } from "../../hooks/useLanguage";

export default function Cart() {
  const { t } = useLanguage();
  const {
    items: cart,
    subtotal,
    shipping,
    total,
    increment,
    decrement,
    removeItem,
  } = useCartStore();
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const isCartEmpty = cart.length === 0;

  const requestRemove = (itemId: number) => {
    setItemToRemove(itemId);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove != null) {
      removeItem(itemToRemove);
      setItemToRemove(null);
    }
  };
  return (
    <Screen>
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between p-4 pb-2 border-b border-white/10">
        <TouchableOpacity
          className="w-12 h-12 items-center justify-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold flex-1 text-center">
          {t("cart.title")}
        </Text>
        <View className="h-12 w-12" />
      </View>

      {/* Main content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <View className="p-4 space-y-4">
          {cart.map((item) => (
            <View
              key={item.itemId}
              className="flex-row items-center gap-4 bg-transparent p-3 rounded-xl border border-white/10"
            >
              <Image
                source={{ uri: item.wine.image }}
                className="h-20 w-20 rounded-lg"
              />
              <View className="flex-1">
                <Text
                  className="text-white text-base font-medium"
                  numberOfLines={1}
                >
                  {item.wine.wineName}
                </Text>
                <Text className="text-[#b99da1] text-sm">
                  ${Number(item.wine.price).toFixed(2)} USD
                </Text>
                <View className="flex-row items-center gap-2 mt-2">
                  <TouchableOpacity
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#39282b]"
                    onPress={() =>
                      item.quantity === 1
                        ? requestRemove(item.itemId)
                        : decrement(item.itemId)
                    }
                  >
                    <Text className="text-white text-base">-</Text>
                  </TouchableOpacity>
                  <Text className="text-white text-base w-6 text-center">
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#39282b]"
                    onPress={() => increment(item.itemId)}
                  >
                    <Text className="text-white text-base">+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                className="shrink-0 self-start"
                onPress={() => requestRemove(item.itemId)}
              >
                <Text className="text-[#b99da1] text-xl">🗑</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <ConfirmModal
        visible={itemToRemove != null}
        title={t("cart.confirmRemove.title")}
        body={t("cart.confirmRemove.message")}
        acceptLabel={t("cart.confirmRemove.accept")}
        cancelLabel={t("cart.confirmRemove.cancel")}
        isError={false}
        onAccept={handleConfirmRemove}
        onClose={() => setItemToRemove(null)}
      />

      {/* Fixed footer summary */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#221013] border-t border-white/10 p-4">
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-[#b99da1] text-sm">{t("cart.subtotal")}</Text>
            <Text className="text-white text-sm font-medium">
              ${subtotal.toFixed(2)} USD
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[#b99da1] text-sm">{t("cart.shipping")}</Text>
            <Text className="text-white text-sm font-medium">
              ${shipping.toFixed(2)} USD
            </Text>
          </View>
          <View className="flex-row justify-between border-t border-white/10 pt-2 mt-2">
            <Text className="text-white text-base font-bold">
              {t("cart.total")}
            </Text>
            <Text className="text-white text-base font-bold">
              ${total.toFixed(2)} USD
            </Text>
          </View>
        </View>

        <View className="pt-4">
          <Pressable
            disabled={isCartEmpty}
            className={`flex w-full h-12 items-center justify-center rounded-xl ${
              isCartEmpty ? "bg-[#4a2a2f] opacity-50" : "bg-[#d41132]"
            }`}
            onPress={() => {
              if (!isCartEmpty) {
                router.push("/cart/checkout-shipping");
              }
            }}
          >
            <Text
              className={`text-base font-bold ${
                isCartEmpty ? "text-[#b99da1]" : "text-white"
              }`}
            >
              {t("cart.orderButton")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
