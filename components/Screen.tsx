import "../global.css";
import { View, Platform } from "react-native";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";

export function Screen({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  return <View className="w-full flex-1 bg-[#221013] px-2 ">{children}</View>;
}
