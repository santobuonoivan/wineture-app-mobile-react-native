import { useEffect, useState } from "react";
import { Link } from "expo-router";

import { FlatList, View, ActivityIndicator, Pressable } from "react-native";
import { getVineyards, VineyardI } from "../lib/wineture";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { VineyardAnimatedCard } from "./VineyardAnimatedCard";
import { Logo } from "./Logo";

import { CircleInfoIcon } from "./Icons";
import { Screen } from "./Screen";

export function Main() {
  const [vineyards, setVineyards] = useState<VineyardI[]>([]);

  useEffect(() => {
    getVineyards().then((vineyards) => {
      setVineyards(vineyards);
    });
  }, []);

  return (
    <Screen>
      {vineyards.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={vineyards}
          keyExtractor={(vineyard) => vineyard.id.toString()}
          renderItem={({ item, index }) => (
            <VineyardAnimatedCard vineyard={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
