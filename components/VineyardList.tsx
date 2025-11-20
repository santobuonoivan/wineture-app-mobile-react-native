import { useEffect, useState } from "react";

import { FlatList, View, ActivityIndicator, Pressable } from "react-native";
import { getVineyardsByGeo } from "../lib";
import { VineyardAnimatedCard } from "./VineyardAnimatedCard";

import { IVineyard } from "../interfaces";

export function VineyardList() {
  const [vineyards, setVineyards] = useState<IVineyard[]>([]);

  useEffect(() => {
    getVineyardsByGeo().then((vineyards) => {
      setVineyards(vineyards);
    });
  }, []);

  return (
    <View className="w-full flex-1 pt-4 px-2 ">
      {vineyards.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          className=" h-full "
          data={vineyards}
          keyExtractor={(vineyard) => vineyard.vineyardId.toString()}
          renderItem={({ item, index }) => (
            <VineyardAnimatedCard vineyard={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
