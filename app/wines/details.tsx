import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, Image, Pressable, View } from "react-native";

export default function WineDetails() {
  const router = useRouter();
  const { wine } = useLocalSearchParams();

  const wineData = JSON.parse(wine as string);

  return (
    <ScrollView className="flex-1 bg-black px-4 pt-6">
      <Pressable
        onPress={() => router.back()}
        className="mb-4 bg-white/10 rounded-lg px-4 py-2 self-start"
      >
        <Text className="text-white font-semibold">← Volver</Text>
      </Pressable>

      <Image
        source={{ uri: wineData.image }}
        className="w-full h-72 rounded-xl mb-6"
        resizeMode="cover"
      />

      <Text className="text-white text-3xl font-bold mb-3">
        {wineData.wineName}
      </Text>

      <Text className="text-gray-300 text-lg mb-2">
        {wineData.wineBrand} • {wineData.wineCategory}
      </Text>

      <Text className="text-white text-2xl font-semibold mb-4">
        ${wineData.price}
      </Text>

      <Text className="text-gray-200 text-base leading-6 mb-10">
        {wineData.description}
      </Text>
    </ScrollView>
  );
}

