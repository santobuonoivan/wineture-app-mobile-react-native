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
import { getVineyardInfoByUUID } from "../../../lib";

export default function VineyardCatalog() {
  const { vineyard_uuid } = useLocalSearchParams<{ vineyard_uuid: string }>();
  const router = useRouter();
  const [vineyard, setVineyard] = useState<IVineyardInfoWithWinesData | null>(
    null
  );
  const [search, setSearch] = useState("");

  const dummyWines = [
    {
      wineId: 1,
      wineBrand: "Bodega del Valle",
      wineCategory: "Tinto",
      wineName: "Reserva de la Familia Malbec",
      wineBarCode: null,
      alcoholContent: "13.5%",
      monthsInBarrel: "12",
      strain: "Malbec",
      valley: "Valle de Guadalupe",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB43PvwWov36kDUWOBvL0ZjQVAsUoHfX1K_znQoo7yqa9fOWH1ZlPcK790WWWLyYpFccX0i5NgXNJ_8i6iuk5ffBFjU66PP89A9pcOutPksYDic7CqKRdIObs2uK-U_CHagXafkG1uuePNLKnWCJ32QJWycQPF9xoh_v3BdeGqkhfPH-Bfjx-VQtkJtnrtcuKZSyFc8fCvYf22nEum6fma_Zc6lDoyb6SR_aSR2of2bPjouQIRVJVTKHb_ao1wM1zQFbuksBOYBKNc",
      description: "Vino tinto intenso con notas a frutos rojos y especias.",
      promoDescription: "Perfecto para carnes rojas y quesos maduros.",
      deletedAt: null,
      status: "active",
      createdAt: "",
      updatedAt: "",
      vineyardId: 1,
      price: "750.00",
    },
    {
      wineId: 2,
      wineBrand: "Bodega del Valle",
      wineCategory: "Tinto",
      wineName: "Gran Sangre de Toro",
      wineBarCode: null,
      alcoholContent: "14%",
      monthsInBarrel: "18",
      strain: "Tempranillo",
      valley: "Valle Central",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCcH7up4FLgJJJtVSAxYBxDkq8P_ZBSwChCgi8pAvzp8Z522QkiEHrBmMwuX6vK-Zn-51TPhIEcW1g1fk6yQ7lLTqy75hvZLQYoqyPnLGOS6DRM-_w4yjUAtocX3JC41Yxs4ob6vdRvf98bUvAiWOfRyWE5uVINMOM7PPFuAhCauO0MAtt64ixB7WrhQMCrTlh_dSkhZ_qV9jdzaAw3RVaanLBe1u4LyLzLi9oJ9qFe-IQS2TQQ8Avd9hw6x9KsYrFxYE3mM9W9Mak",
      description: "Vino tinto estructurado con notas a madera y especias.",
      promoDescription: "Ideal para asados y guisos intensos.",
      deletedAt: null,
      status: "active",
      createdAt: "",
      updatedAt: "",
      vineyardId: 1,
      price: "950.00",
    },
    {
      wineId: 3,
      wineBrand: "Bodega del Valle",
      wineCategory: "Blanco",
      wineName: "Cosecha Tardía Sauvignon",
      wineBarCode: null,
      alcoholContent: "12%",
      monthsInBarrel: "6",
      strain: "Sauvignon Blanc",
      valley: "Valle de Casablanca",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAISDYlEvAC9dyNAC9dMlfHfW04RdeO6hKUt5xFlIhJDg5EqCR03dT1J4tk8ubVCKgkjTQIpF1W4We0tZ5OAgbnWfCpagJ4NR0HVyOJ1pwlXnzADBJ1jBRjIYZfFzYhyDN_SpZczNXXwaYOCuRMzhfl1j073aaKvWTEeTf4yF81R7DVWP6iUJ9ITuY0OmXgR6yUoVftIXoM7LUKCeYE9l4wvgmuNBkFhFXDsvyHaX2zKVdpK1x3sAJXLxQcmB_mqhZ-PUp__hYpHMc",
      description: "Vino blanco fresco y frutal, ideal para aperitivos.",
      promoDescription: "Perfecto para mariscos y ensaladas.",
      deletedAt: null,
      status: "active",
      createdAt: "",
      updatedAt: "",
      vineyardId: 1,
      price: "680.00",
    },
  ];

  useEffect(() => {
    getVineyardInfoByUUID({ uuid: vineyard_uuid }).then((data) => {
      const vineyardData = data.data;
      if (vineyardData) {
        setVineyard(vineyardData as IVineyardInfoWithWinesData);
      }
    });
  }, [vineyard_uuid]);

  const wines = (vineyard?.wines ?? dummyWines) as IVineyardInfoWithWinesData["wines"];

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
            Nuestro Catálogo
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
              placeholder="Buscar por nombre, uva..."
              placeholderTextColor="#a1979a"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Filtros mock (sin lógica aún) */}
        <View className="flex-row gap-3 px-4 pb-3">
          {['Tipo', 'Añada', 'Precio'].map((label) => (
            <Pressable
              key={label}
              className="flex h-8 items-center justify-center gap-2 rounded-lg bg-[#2b1518] px-4 flex-row"
            >
              <Text className="text-stone-200 text-sm font-medium">
                {label}
              </Text>
              <Ionicons
                name="chevron-down-outline"
                size={16}
                color="#e5d5d8"
              />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Lista de vinos */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="flex flex-col gap-4">
          {filteredWines.map((wine) => (
            <View
              key={wine.wineId}
              className="flex-row gap-4 mb-2"
            >
              <ImageBackground
                source={{ uri: wine.image }}
                className="w-24 h-32 rounded-xl overflow-hidden bg-[#3a2226]"
                resizeMode="cover"
              />
              <View className="flex-1 flex-col justify-between">
                <View>
                  <Text className="text-white text-base font-bold" numberOfLines={2}>
                    {wine.wineName}
                  </Text>
                  <Text className="text-stone-400 text-sm mt-1" numberOfLines={1}>
                    {wine.wineCategory}
                  </Text>
                  {wine.description && (
                    <Text
                      className="text-stone-300 text-xs mt-2"
                      numberOfLines={3}
                    >
                      {wine.description}
                    </Text>
                  )}
                  <Text className="text-stone-100 text-base font-bold mt-2">
                    ${parseFloat(wine.price).toFixed(2)} MXN
                  </Text>
                </View>
                <Pressable className="self-start mt-2 flex h-9 flex-row items-center justify-center gap-2 rounded-lg bg-[#d41132] px-4">
                  <Ionicons
                    name="cart-outline"
                    size={16}
                    color="white"
                  />
                  <Text className="text-white text-xs font-bold" numberOfLines={1}>
                    Añadir
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}

          {filteredWines.length === 0 && (
            <View className="w-full items-center justify-center mt-10">
              <Text className="text-stone-400 text-sm">
                No se encontraron vinos para este viñedo.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
