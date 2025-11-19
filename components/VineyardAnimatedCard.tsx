import { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  Pressable,
} from "react-native";
import { Score } from "./Score";
import { Link } from "expo-router";
import { VineyardI } from "../lib/wineture";

export function VineyardCard({ vineyard }: { vineyard: VineyardI }) {
  return (
    <Link href={`/${vineyard.slug}`} asChild>
      <Pressable className="active:opacity-70 border border-black active:border-white/50 mb-2 bg-gray-500/10 rounded-xl p-4">
        <View className="flex-row gap-4" key={vineyard.slug}>
          <Image source={{ uri: vineyard.img }} style={styles.image} />
          <View className="flex-shrink">
            <Text className="mb-1" style={styles.title}>
              {vineyard.name}
            </Text>
            <Score score={vineyard.score} maxScore={10} />
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
  vineyard: VineyardI;
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
  card: {
    marginBottom: 42,
  },
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
  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
});
