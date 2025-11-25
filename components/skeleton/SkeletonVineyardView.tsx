import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Screen } from "../Screen";
export const SkeletonVineyardView = () => (
  <Screen>
    {/* Top App Bar */}
    <View className="flex-row items-center justify-between p-4 pb-2 bg-[#221013]/90">
      <TouchableOpacity className="w-12 h-12 items-center justify-center rounded-full">
        <Ionicons name="arrow-back" size={22} color="white" />
      </TouchableOpacity>
      <View className="flex-row items-center gap-2">
        <View className="w-10 h-10 items-center justify-center rounded-full">
          <Ionicons name="heart-outline" size={22} color="white" />
        </View>
        <View className="w-10 h-10 items-center justify-center rounded-full">
          <Ionicons name="share-social-outline" size={22} color="white" />
        </View>
      </View>
    </View>
    <View className="flex-1 pb-20">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Carrusel de imágenes skeleton */}
        <View className="w-full aspect-video bg-gray-600/50 animate-pulse" />

        {/* Título y resumen skeleton */}
        <View className="px-4 pb-2">
          <View className="h-9 bg-gray-600/50 rounded mb-1 animate-pulse w-3/4" />
          <View className="flex-row items-center gap-2 pt-2">
            <View className="flex-row items-center gap-1">
              <View className="w-4 h-4 bg-gray-600/50 rounded animate-pulse" />
              <View className="h-4 bg-gray-600/50 rounded animate-pulse w-8" />
              <View className="h-4 bg-gray-600/50 rounded animate-pulse w-20" />
            </View>
            <View className="w-1 h-4 bg-gray-600/50 rounded animate-pulse" />
            <View className="h-4 bg-gray-600/50 rounded animate-pulse w-32" />
          </View>
        </View>

        {/* Información skeleton */}
        <View className="flex flex-col gap-6 p-4">
          {/* Sobre nosotros skeleton */}
          <View className="bg-[#482329] p-5 rounded-xl">
            <View className="h-6 bg-gray-600/50 rounded mb-2 animate-pulse w-32" />
            <View className="space-y-1">
              <View className="h-4 bg-gray-600/50 rounded animate-pulse w-full" />
              <View className="h-4 bg-gray-600/50 rounded animate-pulse w-4/5" />
              <View className="h-4 bg-gray-600/50 rounded animate-pulse w-3/4" />
            </View>
          </View>

          {/* Horarios y servicios skeleton */}
          <View className="flex-col gap-4">
            {/* Horarios skeleton */}
            <View className="bg-[#482329] p-5 rounded-xl">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-5 h-5 bg-gray-600/50 rounded animate-pulse" />
                <View className="h-5 bg-gray-600/50 rounded animate-pulse w-20" />
              </View>
              <View className="gap-1">
                <View className="h-4 bg-gray-600/50 rounded animate-pulse w-48" />
                <View className="h-4 bg-gray-600/50 rounded animate-pulse w-52" />
              </View>
            </View>

            {/* Servicios skeleton */}
            <View className="bg-[#482329] p-5 rounded-xl">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-5 h-5 bg-gray-600/50 rounded animate-pulse" />
                <View className="h-5 bg-gray-600/50 rounded animate-pulse w-20" />
              </View>
              <View className="flex-row flex-wrap gap-x-6 gap-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <View key={i} className="flex-row items-center gap-2">
                    <View className="w-4 h-4 bg-gray-600/50 rounded animate-pulse" />
                    <View className="h-4 bg-gray-600/50 rounded animate-pulse w-20" />
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Ubicación skeleton */}
          <View className="bg-[#482329] p-5 rounded-xl">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-5 h-5 bg-gray-600/50 rounded animate-pulse" />
              <View className="h-5 bg-gray-600/50 rounded animate-pulse w-20" />
            </View>
            <View className="h-4 bg-gray-600/50 rounded mb-4 animate-pulse w-3/4" />
            <View className="w-full aspect-video rounded-lg overflow-hidden bg-black/30">
              <View className="w-full h-full bg-gray-600/50 animate-pulse" />
            </View>
          </View>

          {/* Botón de catálogo skeleton */}
          <View className="mt-2">
            <View className="w-full h-14 rounded-xl bg-gray-600/50 animate-pulse" />
          </View>

          {/* Contacto skeleton */}
          <View className="bg-[#482329] p-5 rounded-xl mb-4">
            <View className="h-5 bg-gray-600/50 rounded mb-4 animate-pulse w-20" />
            <View className="flex-col gap-3">
              <View className="h-12 bg-gray-600/50 rounded-lg animate-pulse" />
              <View className="h-12 bg-gray-600/50 rounded-lg animate-pulse" />
              <View className="h-12 bg-gray-600/50 rounded-lg animate-pulse" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky footer skeleton */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#221013]">
        <View className="w-full h-14 rounded-xl bg-gray-600/50 animate-pulse" />
      </View>
    </View>
  </Screen>
);
