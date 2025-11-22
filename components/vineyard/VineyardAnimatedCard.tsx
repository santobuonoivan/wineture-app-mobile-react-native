import { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { IVineyard } from "../../interfaces";

export function VineyardCard({ vineyard }: { vineyard: IVineyard }) {
  return (
    <Link href={`/vineyard/${vineyard.uuid}`} asChild>
      <Pressable className="active:opacity-70 border border-black active:border-white/50 mb-2 bg-gray-500/10 rounded-xl p-2">
        <View className="flex-row gap-4" key={vineyard.uuid}>
          <Image
            source={{ uri: vineyard.images[0]?.url ?? vineyard.img }}
            style={styles.image}
          />
          <View className="flex-shrink">
            <Text className="mb-1" style={styles.title}>
              {vineyard.vineyardName}
            </Text>
            <Text className="mt-2 flex-shrink" style={styles.description}>
              {vineyard.description.slice(0, 100)}...
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export function VineyardAnimatedCard({
  vineyard,
  index,
}: {
  vineyard: IVineyard;
  index: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <VineyardCard vineyard={vineyard} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#eee",
  },
});
