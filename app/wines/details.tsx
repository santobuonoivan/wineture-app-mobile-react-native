import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Screen } from "../../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../../hooks/useLanguage";
import { useCartStore } from "../../store/useCartStore";
import { IWine } from "../../interfaces/IVineyard";
import { ConfirmModal } from "../../components/ui/ConfirmModal";

export default function WineDetails() {
  const router = useRouter();
  const { wine } = useLocalSearchParams();
  const { t, currentLanguage } = useLanguage();
  const { addItem, items, increment, decrement, removeItem } = useCartStore();
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const wineData: IWine = JSON.parse(wine as string);

  // Modal functions
  const requestRemove = (itemId: number) => {
    setItemToRemove(itemId);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove != null) {
      removeItem(itemToRemove);
      setItemToRemove(null);
    }
  };

  // Helper function to get wine quantity in cart
  const getWineQuantityInCart = (wineId: number) => {
    const cartItem = items.find((item) => item.wine.wineId === wineId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Helper function to get cart item ID
  const getCartItemId = (wineId: number) => {
    const cartItem = items.find((item) => item.wine.wineId === wineId);
    return cartItem ? cartItem.itemId : null;
  };

  const description =
    currentLanguage === "en"
      ? wineData.descriptionEN
      : currentLanguage === "pt"
        ? wineData.descriptionPT
        : wineData.description;

  return (
    <Screen>
      {/* Header */}
      <View className="sticky top-0 z-20 flex-row items-center justify-between p-4 bg-[#221013]/80 backdrop-blur-sm">
        <Pressable
          className="w-12 h-12 items-center justify-center rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-bold tracking-tight text-white">
          {t("wineDetail.title")}
        </Text>
        <View className="w-12" />
      </View>

      <ScrollView className="flex-1">
        {/* Hero Image */}
        <View className="relative h-96 w-full">
          <ImageBackground
            source={{ uri: wineData.image }}
            className="h-full w-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', '#221013']}
            className="absolute inset-0"
          />
        </View>

        {/* Content */}
        <View className="relative z-10 -mt-24 space-y-6 px-4">
          {/* Wine Info */}
          <View className="space-y-2 py-4">
            <Text className="text-sm font-medium uppercase tracking-wider text-stone-400">
              {wineData.wineBrand}
            </Text>
            <Text className="text-3xl font-bold leading-tight tracking-tighter text-white">
              {wineData.wineName}
            </Text>
          </View>

          {/* Wine Properties Grid */}
          <View className="flex-row flex-wrap gap-4 py-4">
            <View className="flex-1 min-w-[45%] rounded-xl bg-white/5 p-3 items-center">
              <Text className="text-xs text-stone-400">
                {t("wineDetail.alcohol")}
              </Text>
              <Text className="font-bold text-white">13.5%</Text>
            </View>
            <View className="flex-1 min-w-[45%] rounded-xl bg-white/5 p-3 items-center">
              <Text className="text-xs text-stone-400">
                {t("wineDetail.barrel")}
              </Text>
              <Text className="font-bold text-white">
                12 {t("wineDetail.months")}
              </Text>
            </View>
            <View className="flex-1 min-w-[45%] rounded-xl bg-white/5 p-3 items-center">
              <Text className="text-xs text-stone-400">
                {t("wineDetail.grape")}
              </Text>
              <Text className="font-bold text-white">
                {wineData.wineCategory}
              </Text>
            </View>
            <View className="flex-1 min-w-[45%] rounded-xl bg-white/5 p-3 items-center">
              <Text className="text-xs text-stone-400">
                {t("wineDetail.valley")}
              </Text>
              <Text className="font-bold text-white">Valle de Uco</Text>
            </View>
          </View>

          {/* Description */}
          <View>
            <Text className="mb-2 text-lg font-bold text-white">
              {t("wineDetail.description")}
            </Text>
            <Text className="text-stone-300 leading-relaxed">
              {description}
            </Text>
          </View>

          {/* Spacer for footer */}
          <View className="h-24" />
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="sticky bottom-0 z-20 mt-auto bg-[#221013]/80 p-4 backdrop-blur-sm">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-stone-400">
              {t("wineDetail.price")}
            </Text>
            <Text className="text-2xl font-bold text-white">
              ${wineData.price} MXN
            </Text>
          </View>

          {getWineQuantityInCart(wineData.wineId) > 0 ? (
            // Quantity controls when wine is in cart
            <View className="flex-row items-center gap-3">
              <Pressable
                className="w-10 h-10 rounded-full bg-[#2b1518] items-center justify-center border border-[#d41132]"
                onPress={() => {
                  const itemId = getCartItemId(wineData.wineId);
                  const quantity = getWineQuantityInCart(wineData.wineId);
                  if (itemId) {
                    if (quantity === 1) {
                      requestRemove(itemId);
                    } else {
                      decrement(itemId);
                    }
                  }
                }}
              >
                <Ionicons name="remove" size={20} color="#d41132" />
              </Pressable>
              <Text className="text-white font-bold text-lg min-w-[30px] text-center">
                {getWineQuantityInCart(wineData.wineId)}
              </Text>
              <Pressable
                className="w-10 h-10 rounded-full bg-[#d41132] items-center justify-center"
                onPress={() => {
                  const itemId = getCartItemId(wineData.wineId);
                  if (itemId) increment(itemId);
                }}
              >
                <Ionicons name="add" size={20} color="white" />
              </Pressable>
            </View>
          ) : (
            // Add button when wine is not in cart
            <Pressable
              className="flex-row items-center justify-center gap-2 rounded-xl h-12 px-6 bg-[#d41132] min-w-[140px]"
              onPress={() => addItem(wineData)}
            >
              <Ionicons name="cart-outline" size={20} color="white" />
              <Text className="text-white text-base font-bold">
                {t("catalog.addToCart")}
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Confirmation Modal */}
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
    </Screen>
  );
}
