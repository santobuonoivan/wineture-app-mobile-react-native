import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { useEffect, useState } from "react";
import { IVineyard } from "../interfaces";

// Mock vineyard data - in a real app this would come from an API
const mockVineyard: IVineyard = {
  uuid: "sample-uuid",
  vineyardId: 1,
  vineyardName: "Viña de Ejemplo",
  description:
    "Esta es una viña de ejemplo para mostrar el detalle. En una aplicación real, aquí cargarías los datos desde tu API usando el UUID del parámetro de la ruta.",
  img: "https://via.placeholder.com/300x400/666/fff?text=Viña",
  locations: [],
  images: [],
  lat: -35.4161,
  long: -69.6167,
};

export default function VineyardDetail() {
  const { vineyard_uuid } = useLocalSearchParams<{ vineyard_uuid: string }>();
  const router = useRouter();
  const [vineyard, setVineyard] = useState<IVineyard | null>(null);

  useEffect(() => {
    // TODO: Fetch real vineyard data using vineyard_uuid
    // For now, we'll use mock data
    setVineyard(mockVineyard);
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
            source={{ uri: vineyard.img }}
            className="w-full h-64 rounded-lg mb-4"
            resizeMode="cover"
          />

          <Text className="text-white text-2xl font-bold mb-4">
            {vineyard.vineyardName}
          </Text>

          <Text className="text-gray-300 text-base leading-6 mb-6">
            {vineyard.description}
          </Text>

          <View className="bg-gray-800 rounded-lg p-4 mb-4">
            <Text className="text-white text-lg font-semibold mb-2">
              Información de ubicación
            </Text>
            <Text className="text-gray-300">UUID: {vineyard.uuid}</Text>
            <Text className="text-gray-300">ID: {vineyard.vineyardId}</Text>
            <Text className="text-gray-300">Latitud: {vineyard.lat}</Text>
            <Text className="text-gray-300">Longitud: {vineyard.long}</Text>
          </View>

          {vineyard.locations && vineyard.locations.length > 0 && (
            <View className="bg-gray-800 rounded-lg p-4">
              <Text className="text-white text-lg font-semibold mb-2">
                Ubicaciones adicionales
              </Text>
              {vineyard.locations.map((location) => (
                <Text key={location.id} className="text-gray-300 mb-1">
                  • {location.location}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
