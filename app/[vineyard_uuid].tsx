import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { useEffect, useState } from "react";
import { IVineyardInfoWithWinesData } from "../interfaces";
import { getVineyardInfoByUUID } from "../lib";
import { VisitBookingForm } from "../components/vineyard/VisitBookingForm";

export default function VineyardDetail() {
  const { vineyard_uuid } = useLocalSearchParams<{ vineyard_uuid: string }>();
  const router = useRouter();
  const [vineyard, setVineyard] = useState<IVineyardInfoWithWinesData | null>(
    null
  );

  useEffect(() => {
    getVineyardInfoByUUID({ uuid: vineyard_uuid }).then((data) => {
      const vineyardData = data.data;
      if (!!vineyardData) {
        setVineyard(vineyardData as IVineyardInfoWithWinesData);
      }
    });
  }, [vineyard_uuid]);

  if (!vineyard) {
    return (
      <Screen>
        <Text className="text-white text-center text-lg mt-10">
          Cargando viña...
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView className="flex-1">
        <Pressable
          onPress={() => router.back()}
          className="mb-4 bg-gray-800 rounded-lg px-4 py-2 self-start"
        >
          <Text className="text-white font-semibold">← Volver</Text>
        </Pressable>

        <View className="flex-1">
          <Image
            source={{ uri: vineyard?.img }}
            className="w-full h-64 rounded-lg mb-4"
            resizeMode="cover"
          />

          <Text className="text-white text-2xl font-bold mb-4">
            {vineyard.vineyardName}
          </Text>

          <Text className="text-gray-300 text-base leading-6 mb-6">
            {vineyard.description}
          </Text>

          <Pressable
            onPress={() => router.push(`/wines/${vineyard.vineyardId}`)}
            className="bg-[#800020] py-3 rounded-xl mb-6 items-center"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
            }}
          >
            <Text className="text-white text-base font-semibold">
              Ver catálogo de vinos
            </Text>
          </Pressable>

          <View className="bg-gray-800 rounded-lg p-4 mb-6">
            <Text className="text-white text-lg font-semibold mb-2">
              Información de ubicación
            </Text>
            <Text className="text-gray-300">UUID: {vineyard.uuid}</Text>
            <Text className="text-gray-300">ID: {vineyard.vineyardId}</Text>
          </View>

          <VisitBookingForm vineyardId={vineyard.vineyardId} />
        </View>
      </ScrollView>
    </Screen>
  );
}
