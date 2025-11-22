import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

interface VineyardImageCarouselProps {
  images: { id: number; url: string }[];
}

const { width } = Dimensions.get("window");

export const VineyardImageCarousel: React.FC<VineyardImageCarouselProps> = ({
  images,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View className="px-4">
      <ScrollView
        horizontal
        pagingEnabled
        className="rounded-lg"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            className="rounded-lg"
            key={index}
            source={{ uri: image.url }}
            style={{
              width: width - 64,
              height: 220,
              resizeMode: "cover",
              marginRight: index === images.length - 1 ? 0 : 8,
            }}
          />
        ))}
      </ScrollView>

      <View className="flex-row items-center justify-center gap-2 py-3">
        {images.map((_, index) => (
          <View
            key={index}
            className={
              "h-2 rounded-full " +
              (index === activeIndex
                ? "w-4 bg-[#800020]"
                : "w-2 bg-[#800020]/40")
            }
          />
        ))}
      </View>
    </View>
  );
};
