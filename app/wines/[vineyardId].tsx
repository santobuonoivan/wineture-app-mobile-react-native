import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getWinesInfoByVineyard } from "../../lib";

type Wine = {
  wineId?: number;
  wineName?: string;
  wineBrand?: string;
  wineCategory?: string;
  price?: string | number;
  strain?: string;
  description?: string;
  image?: string;
};

export default function WineListScreen() {
  const { vineyardId } = useLocalSearchParams<{ vineyardId: any }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wines, setWines] = useState<Wine[]>([]);

  useEffect(() => {
    if (!vineyardId) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const res: any = await getWinesInfoByVineyard({ vineyardId });

        let data = res?.data ?? res;
        if (data?.wines && Array.isArray(data.wines)) {
          setWines(data.wines);
        } else if (Array.isArray(data)) {
          setWines(data);
        } else {
          const maybeList = res?.data?.data ?? data;
          if (Array.isArray(maybeList)) setWines(maybeList);
          else setWines([]);
        }
      } catch (e: any) {
        setError(e?.message ?? "Error al cargar los vinos");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [vineyardId]);

  return (
    <View className="flex-1 bg-[#0d0d0f]">
      <View className="px-4 pt-4">
        <Pressable
          onPress={() => router.back()}
          className="mb-3 bg-white/10 border border-white/10 rounded-xl px-4 py-2 self-start"
        >
          <Text className="text-white font-medium text-base">← Volver</Text>
        </Pressable>
      </View>

      <View className="px-4">
        <Text className="text-white text-3xl font-bold mb-1">Vinos</Text>
        <Text className="text-gray-400 text-sm mb-4">
          {wines.length
            ? `${wines.length} resultados`
            : "Explora los vinos disponibles"}
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
          <Text className="mt-3 text-gray-400">Cargando vinos...</Text>
        </View>
      ) : error ? (
        <View className="p-4">
          <Text className="text-red-400 font-semibold text-center text-base">
            Error: {error}
          </Text>
        </View>
      ) : wines.length === 0 ? (
        <View className="p-6">
          <Text className="text-gray-400 text-center">
            No hay vinos para este viñedo.
          </Text>
        </View>
      ) : (
        <ScrollView className="px-4 pb-24">
          {wines.map((w, idx) => (
            <Pressable
              key={w.wineId ?? idx}
              onPress={() =>
                router.push({
                  pathname: "/wines/details",
                  params: { wine: JSON.stringify(w) },
                })
              }
            >
              <View
                className="bg-[#151519] rounded-xl mb-4 overflow-hidden"
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <View className="flex-row p-3">
                  <View className="mr-3">
                    <Image
                      source={
                        w.image
                          ? { uri: w.image }
                          : require("../../assets/icon.png")
                      }
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: 8,
                        backgroundColor: "#222",
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-white font-semibold text-lg">
                      {w.wineName}
                    </Text>

                    <Text className="text-gray-300 mt-1">
                      {w.wineBrand} • {w.wineCategory}
                    </Text>

                    <Text className="text-gray-200 mt-2 font-semibold">
                      ${w.price} {w.strain ? ` • ${w.strain}` : ""}
                    </Text>

                    <Text
                      className="text-gray-300 mt-2"
                      numberOfLines={3}
                      ellipsizeMode="tail"
                    >
                      {w.description}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
