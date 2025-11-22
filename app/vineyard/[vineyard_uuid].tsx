import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../components/Screen";
import { useEffect, useState } from "react";
import { IVineyardInfoWithWinesData } from "../../interfaces";
import { getVineyardInfoByUUID } from "../../lib";
import { Ionicons } from "@expo/vector-icons";
import { VineyardLocationMap } from "../../components/vineyard/VineyardLocationMap";
import { VineyardImageCarousel } from "../../components/vineyard/VineyardImageCarousel";

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
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-center text-lg">
            Cargando viña...
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Top App Bar */}
      <View className="flex-row items-center justify-between p-4 pb-2 bg-[#221013]/90">
        <TouchableOpacity
          className="w-12 h-12 items-center justify-center rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full">
            <Ionicons name="heart-outline" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full">
            <Ionicons name="share-social-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 pb-20">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Carrusel de imágenes del viñedo */}
          <VineyardImageCarousel images={vineyard.images} />

          {/* Título y resumen */}
          <View className="px-4 pb-2">
            <Text className="text-white text-3xl font-bold mb-1">
              {vineyard.vineyardName}
            </Text>
            <View className="flex-row items-center gap-2 pt-2">
              <View className="flex-row items-center gap-1">
                <Ionicons name="star" size={16} color="#facc15" />
                <Text className="text-white font-bold text-sm">4.8</Text>
                <Text className="text-[#c9929b] text-sm">(215 reseñas)</Text>
              </View>
              <Text className="text-[#c9929b] text-sm">•</Text>
              <Text className="text-[#c9929b] text-sm">
                Valle de Guadalupe, México
              </Text>
            </View>
          </View>

          {/* Información */}
          <View className="flex flex-col gap-6 p-4">
            {/* Sobre nosotros */}
            <View className="bg-[#482329] p-5 rounded-xl">
              <Text className="text-white text-xl font-bold mb-2">
                Sobre Nosotros
              </Text>
              <Text className="text-[#f3d6dc] text-base leading-relaxed">
                {vineyard.description}
              </Text>
            </View>

            {/* Horarios y servicios */}
            <View className="flex-col gap-4">
              {/* Horarios */}
              <View className="bg-[#482329] p-5 rounded-xl">
                <View className="flex-row items-center gap-2 mb-3">
                  <Ionicons name="time-outline" size={18} color="#f3d6dc" />
                  <Text className="text-white text-lg font-bold">Horarios</Text>
                </View>
                <View className="gap-1">
                  <Text className="text-[#f3d6dc] text-sm">
                    <Text className="font-semibold">Lunes a Viernes:</Text>{" "}
                    10:00 - 18:00
                  </Text>
                  <Text className="text-[#f3d6dc] text-sm">
                    <Text className="font-semibold">Sábados y Domingos:</Text>{" "}
                    10:00 - 20:00
                  </Text>
                </View>
              </View>

              {/* Servicios */}
              <View className="bg-[#482329] p-5 rounded-xl">
                <View className="flex-row items-center gap-2 mb-3">
                  <Ionicons name="wine" size={18} color="#f3d6dc" />
                  <Text className="text-white text-lg font-bold">
                    Servicios
                  </Text>
                </View>
                <View className="flex-row flex-wrap gap-x-6 gap-y-2">
                  {[
                    "Cata de vinos",
                    "Restaurante",
                    "Tours guiados",
                    "Accesible",
                  ].map((label) => (
                    <View key={label} className="flex-row items-center gap-2">
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={16}
                        color="#C06078"
                      />
                      <Text className="text-[#f3d6dc] text-sm">{label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Ubicación con mapa real */}
            <View className="bg-[#482329] p-5 rounded-xl">
              <View className="flex-row items-center gap-2 mb-3">
                <Ionicons name="location-outline" size={18} color="#f3d6dc" />
                <Text className="text-white text-lg font-bold">Ubicación</Text>
              </View>
              <Text className="text-[#f3d6dc] text-sm mb-4">
                Carretera Ensenada-Tecate Km 88, Valle de Guadalupe, 22760,
                B.C., México
              </Text>
              <View className="w-full aspect-video rounded-lg overflow-hidden bg-black/30">
                <VineyardLocationMap
                  latitude={-32.0391}
                  longitude={-60.3069}
                  vineyardName={vineyard.vineyardName}
                />
              </View>
            </View>

            {/* Contacto */}
            <View className="bg-[#482329] p-5 rounded-xl mb-4">
              <Text className="text-white text-lg font-bold mb-4">
                Contacto
              </Text>
              <View className="flex-col gap-3">
                <TouchableOpacity className="flex-row items-center justify-center gap-2 px-4 py-3 bg-[#800020]/20 rounded-lg">
                  <Ionicons name="call-outline" size={18} color="#c6102e" />
                  <Text className="text-[#c6102e] font-bold">Llamar</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-center gap-2 px-4 py-3 bg-[#800020]/20 rounded-lg">
                  <Ionicons name="mail-outline" size={18} color="#c6102e" />
                  <Text className="text-[#c6102e] font-bold">Email</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-center gap-2 px-4 py-3 bg-[#800020]/20 rounded-lg">
                  <Ionicons name="globe-outline" size={18} color="#c6102e" />
                  <Text className="text-[#c6102e] font-bold">Sitio Web</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky footer CTA */}
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#221013]">
          <TouchableOpacity
            className="w-full h-14 rounded-xl bg-[#800020] items-center justify-center flex-row gap-2"
            onPress={() => router.push(`/vineyard/${vineyard_uuid}/book`)}
          >
            <Ionicons name="calendar-outline" size={20} color="#fff" />
            <Text className="text-white text-lg font-bold">
              Reservar Visita
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}
