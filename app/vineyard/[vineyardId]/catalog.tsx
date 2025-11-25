import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../../components/Screen";
import { useEffect, useState } from "react";
import { IVineyardInfoWithWinesData } from "../../../interfaces";
import { getVineyardInfoByUUID, getWinesInfoByVineyard } from "../../../lib";
import { IWine } from "../../../interfaces/IVineyard";
import { useLanguage } from "../../../hooks/useLanguage";
import { SkeletonWine } from "../../../components/skeleton/SkeletoneWine";
import { useCartStore } from "../../../store/useCartStore";
import { ConfirmModal } from "../../../components/ui/ConfirmModal";

export default function VineyardCatalog() {
  const { vineyardId } = useLocalSearchParams<{ vineyardId: string }>();
  const router = useRouter();
  const { t, currentLanguage } = useLanguage();
  const { items, addItem, increment, decrement, removeItem } = useCartStore();
  const [wines, setWines] = useState<IWine[]>([]);
  const [search, setSearch] = useState("");
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

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

  useEffect(() => {
    getWinesInfoByVineyard({ vineyardId: parseInt(vineyardId) }).then(
      (data) => {
        const vineyardData = data.data;
        if (vineyardData) {
          setWines(vineyardData as IWine[]);
        }
      }
    );
  }, [vineyardId]);

  const filteredWines = wines.filter((wine) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      wine.wineName.toLowerCase().includes(term) ||
      wine.wineBrand.toLowerCase().includes(term) ||
      wine.wineCategory.toLowerCase().includes(term)
    );
  });

  return (
    <Screen>
      {/* Header */}
      <View className="sticky top-0 z-10 bg-[#221013]/80 backdrop-blur-sm">
        <View className="flex-row items-center p-4 pb-2">
          <Pressable
            className="w-12 h-12 items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold tracking-tight text-white">
            {t("catalog.title")}
          </Text>
          <View className="w-12 items-center justify-end">
            <Pressable className="relative h-12 w-12 items-center justify-center">
              <Ionicons name="cart-outline" size={22} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Search */}
        <View className="px-4 py-3">
          <View className="flex flex-row h-12 w-full rounded-xl overflow-hidden bg-[#2b1518]">
            <View className="w-12 items-center justify-center bg-[#3a2226]">
              <Ionicons name="search-outline" size={18} color="#e5d5d8" />
            </View>
            <TextInput
              className="flex-1 px-3 text-base text-white"
              placeholder={t("catalog.searchPlaceholder")}
              placeholderTextColor="#a1979a"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Filtros mock (sin lógica aún) */}
        <View className="flex-row gap-3 px-4 pb-3">
          {[
            { key: "type", label: t("catalog.filters.type") },
            { key: "vintage", label: t("catalog.filters.vintage") },
            { key: "price", label: t("catalog.filters.price") },
          ].map(({ key, label }) => (
            <Pressable
              key={key}
              className="flex h-8 items-center justify-center gap-2 rounded-lg bg-[#2b1518] px-4 flex-row"
            >
              <Text className="text-stone-200 text-sm font-medium">
                {label}
              </Text>
              <Ionicons name="chevron-down-outline" size={16} color="#e5d5d8" />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Lista de vinos */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="flex flex-col gap-4">
          {filteredWines.map((wine) => (
            <View key={wine.wineId} className="flex-row gap-4 mb-2">
              <ImageBackground
                source={{ uri: wine.image }}
                className="w-24 h-32 rounded-xl overflow-hidden bg-[#3a2226]"
                resizeMode="cover"
              />
              <View className="flex-1 flex-col justify-between">
                <View>
                  <Text
                    className="text-white text-base font-bold"
                    numberOfLines={2}
                  >
                    {wine.wineName}
                  </Text>
                  <Text
                    className="text-stone-400 text-sm mt-1"
                    numberOfLines={1}
                  >
                    {wine.wineCategory}
                  </Text>
                  {wine.description && (
                    <Text
                      className="text-stone-300 text-xs mt-2"
                      numberOfLines={3}
                    >
                      {currentLanguage === "en"
                        ? wine.descriptionEN
                        : currentLanguage === "pt"
                          ? wine.descriptionPT
                          : wine.description}
                    </Text>
                  )}
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-stone-100 text-base font-bold">
                      ${parseFloat(wine.price).toFixed(2)} USD
                    </Text>
                    {getWineQuantityInCart(wine.wineId) > 0 ? (
                      // Quantity controls when wine is in cart
                      <View className="flex-row items-center gap-2">
                        <Pressable
                          className="w-8 h-8 rounded-full bg-[#2b1518] items-center justify-center border border-[#d41132]"
                          onPress={() => {
                            const itemId = getCartItemId(wine.wineId);
                            const quantity = getWineQuantityInCart(wine.wineId);
                            if (itemId) {
                              if (quantity === 1) {
                                requestRemove(itemId);
                              } else {
                                decrement(itemId);
                              }
                            }
                          }}
                        >
                          <Ionicons name="remove" size={16} color="#d41132" />
                        </Pressable>
                        <Text className="text-white font-bold min-w-[20px] text-center">
                          {getWineQuantityInCart(wine.wineId)}
                        </Text>
                        <Pressable
                          className="w-8 h-8 rounded-full bg-[#d41132] items-center justify-center"
                          onPress={() => {
                            const itemId = getCartItemId(wine.wineId);
                            if (itemId) increment(itemId);
                          }}
                        >
                          <Ionicons name="add" size={16} color="white" />
                        </Pressable>
                      </View>
                    ) : (
                      // Add button when wine is not in cart
                      <Pressable
                        className="flex h-9 flex-row items-center justify-center gap-2 rounded-lg bg-[#d41132] px-4"
                        onPress={() => addItem(wine)}
                      >
                        <Ionicons name="cart-outline" size={16} color="white" />
                        <Text
                          className="text-white text-xs font-bold"
                          numberOfLines={1}
                        >
                          {t("catalog.addToCart")}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))}

          {filteredWines.length === 0 && (
            <View className="w-full items-center justify-center mt-10">
              <SkeletonWine />
              <SkeletonWine />

              <SkeletonWine />
              <SkeletonWine />
            </View>
          )}
        </View>
      </ScrollView>

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
