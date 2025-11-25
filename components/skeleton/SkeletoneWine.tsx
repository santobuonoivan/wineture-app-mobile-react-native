import { View } from "react-native";

export function SkeletonWine() {
  return (
    <View className="flex-row gap-4 mb-2">
      {/* Imagen skeleton */}
      <View className="w-24 h-32 rounded-xl bg-[#3a2226] animate-pulse" />

      {/* Contenido skeleton */}
      <View className="flex-1 flex-col justify-between">
        <View>
          {/* Nombre del vino - 2 líneas */}
          <View className="h-4 bg-[#3a2226] rounded mb-1 animate-pulse" />
          <View className="h-4 bg-[#3a2226] rounded w-3/4 animate-pulse" />

          {/* Categoría */}
          <View className="h-3 bg-[#2b1518] rounded w-1/2 mt-2 animate-pulse" />

          {/* Descripción - 3 líneas */}
          <View className="mt-2 space-y-1">
            <View className="h-3 bg-[#2b1518] rounded animate-pulse" />
            <View className="h-3 bg-[#2b1518] rounded w-5/6 animate-pulse" />
            <View className="h-3 bg-[#2b1518] rounded w-4/6 animate-pulse" />
          </View>

          {/* Precio */}
          <View className="h-4 bg-[#3a2226] rounded w-20 mt-2 animate-pulse" />
        </View>

        {/* Botón de añadir */}
        <View className="self-start mt-2 h-9 w-20 rounded-lg bg-[#2b1518] animate-pulse" />
      </View>
    </View>
  );
}
