import { useEffect, useState } from "react";

import { FlatList, View, ActivityIndicator, Pressable } from "react-native";
import { getVineyards } from "../lib/wineture";
import { VineyardAnimatedCard } from "./VineyardAnimatedCard";

import { Screen } from "./Screen";
import { IVineyard } from "../interfaces";

export function VineyardList() {
  const [vineyards, setVineyards] = useState<IVineyard[]>([]);

  useEffect(() => {
    getVineyards().then((vineyards) => {
      console.log(vineyards);
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
          keyExtractor={(vineyard) => vineyard.vineyardId.toString()}
          renderItem={({ item, index }) => (
            <VineyardAnimatedCard vineyard={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
