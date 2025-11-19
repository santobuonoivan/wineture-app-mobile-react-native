import "../global.css";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <View className="w-full flex-1 bg-black px-2 border border-width-2 border-white">
      {children}
    </View>
  );
}
