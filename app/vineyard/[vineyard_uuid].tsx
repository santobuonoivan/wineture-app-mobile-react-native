import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "../../components/Screen";
import { useEffect, useState } from "react";
import {
  IVineyardInfoWithWinesData,
  ILocation,
  IVineyardService,
} from "../../interfaces";
import { getVineyardInfoByUUID } from "../../lib";
import { Ionicons } from "@expo/vector-icons";
import { VineyardLocationMap } from "../../components/vineyard/VineyardLocationMap";
import { VineyardImageCarousel } from "../../components/vineyard/VineyardImageCarousel";
import { getVineyardServicesByUUID } from "../../lib/getVineyardServicesByUUID";
import { SkeletonVineyardView } from "../../components/skeleton/SkeletonVineyardView";
import { ISocialNetwork } from "../../interfaces/IVineyard";
import { SocialNetworkList } from "../../components/ui/SocialNetworkList";

export default function VineyardDetail() {
  const { vineyard_uuid } = useLocalSearchParams<{ vineyard_uuid: string }>();
  const router = useRouter();
  const [vineyard, setVineyard] = useState<IVineyardInfoWithWinesData>();
  const [location, setLocation] = useState<ILocation | null>(null);
  const [services, setServices] = useState<IVineyardService[] | null>(null);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [socialNetworks, setSocialNetworks] = useState<ISocialNetwork | null>(
    null
  );

  useEffect(() => {
    getVineyardInfoByUUID({ uuid: vineyard_uuid })
      .then((data) => {
        const vineyardData = data.data;
        if (!!vineyardData) {
          setVineyard(vineyardData as IVineyardInfoWithWinesData);
          if (vineyardData.socialNetworks) {
            setSocialNetworks(vineyardData.socialNetworks);
          }
          if (vineyardData.locations && vineyardData.locations.length > 0) {
            setLocation(vineyardData.locations[0]);
          }
        }
      })
      .catch((error) => {
        console.error(`Error loading vineyard data: ${error}`);
      });

    getVineyardServicesByUUID({ uuid: vineyard_uuid })
      .then((data) => {
        const servicesData = data.data;
        if (servicesData && servicesData.length > 0) {
          setServices(servicesData);
          const serviceNames = servicesData.map(
            (service) => service.serviceType.name
          );

          // 1. Convertimos el array a un Set para obtener solo nombres únicos.
          // 2. Convertimos el Set de nuevo a un Array usando el spread operator (...).
          const uniqueServiceNames = [...new Set(serviceNames)];
          setServiceTypes(uniqueServiceNames);
        }
      })
      .catch((error) => {
        console.error(`Error loading vineyard services: ${error}`);
      });
  }, [vineyard_uuid]);

  if (!vineyard) {
    return <SkeletonVineyardView />;
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
                  {serviceTypes?.map((name) => (
                    <View key={name} className="flex-row items-center gap-2">
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={16}
                        color="#C06078"
                      />
                      <Text className="text-[#f3d6dc] text-sm">{name}</Text>
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
                {location
                  ? `${location.location}, ${location.country}`
                  : "no tiene ubicación registrada"}
              </Text>
              <View className="w-full aspect-video rounded-lg overflow-hidden bg-black/30">
                <VineyardLocationMap
                  latitude={location ? parseFloat(location.lat) : -32.0391}
                  longitude={location ? parseFloat(location.long) : -60.3069}
                  vineyardName={vineyard.vineyardName}
                />
              </View>
            </View>

            {/* Botón de catálogo de vinos */}
            <View className="mt-2">
              <TouchableOpacity
                className="w-full h-14 rounded-xl bg-[#800020] items-center justify-center flex-row gap-2"
                onPress={() =>
                  router.push(`/vineyard/${vineyard_uuid}/catalog`)
                }
              >
                <Ionicons name="wine" size={20} color="#fff" />
                <Text className="text-white text-lg font-bold">
                  Ver nuestros vinos
                </Text>
              </TouchableOpacity>
            </View>

            {/* Redes sociales */}
            {socialNetworks && (
              <SocialNetworkList socialNetworks={socialNetworks} />
            )}
            {/* Contacto */}
            <View className="bg-[#482329] p-5 rounded-xl mb-4">
              <Text className="text-white text-lg font-bold mb-4">
                Contacto
              </Text>
              <View className="flex-col gap-3">
                <TouchableOpacity
                  className="flex-row items-center justify-center gap-2 px-4 py-3 bg-[#800020]/20 rounded-lg"
                  onPress={async () => {
                    try {
                      if (vineyard.phone) {
                        const phoneUrl = `tel:${vineyard.phone}`;
                        const supported = await Linking.canOpenURL(phoneUrl);
                        if (supported) {
                          await Linking.openURL(phoneUrl);
                        } else {
                          Alert.alert(
                            "Error",
                            "No se puede realizar la llamada en este dispositivo"
                          );
                        }
                      } else {
                        Alert.alert(
                          "Información",
                          "No hay número de teléfono disponible"
                        );
                      }
                    } catch (error) {
                      console.error("Error al abrir teléfono:", error);
                      Alert.alert(
                        "Error",
                        "Ocurrió un error al intentar llamar"
                      );
                    }
                  }}
                >
                  <Ionicons name="call-outline" size={18} color="white" />
                  <Text className="text-white font-bold">Llamar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-row items-center justify-center gap-2 px-4 py-3 bg-[#800020]/20 rounded-lg"
                  onPress={async () => {
                    try {
                      if (vineyard.email) {
                        const emailUrl = `mailto:${vineyard.email}`;
                        const supported = await Linking.canOpenURL(emailUrl);
                        if (supported) {
                          await Linking.openURL(emailUrl);
                        } else {
                          Alert.alert(
                            "Error",
                            "No se puede abrir la aplicación de email en este dispositivo"
                          );
                        }
                      } else {
                        Alert.alert("Información", "No hay email disponible");
                      }
                    } catch (error) {
                      console.error("Error al abrir email:", error);
                      Alert.alert(
                        "Error",
                        "Ocurrió un error al intentar enviar email"
                      );
                    }
                  }}
                >
                  <Ionicons name="mail-outline" size={18} color="white" />
                  <Text className="text-white font-bold">Email</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky footer CTA */}
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#221013]">
          <TouchableOpacity
            className="w-full h-14 rounded-xl bg-[#800020] items-center justify-center flex-row gap-2"
            onPress={() =>
              router.push(`/reservation/${vineyard.vineyardId}/tour`)
            }
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
